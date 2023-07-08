import { Request, Response } from "express";
import { genSalt, hash, compare } from "bcrypt";

import pool from "../db";
import {
  registerUser,
  usernameExists,
  emailExists,
} from "../queries/authQueries";

// TODO: add e-mail verification. this can be done using JWT and setting the token expiration
// to a short time period (30 minutes).
// TODO: add a password reset feature.
const addUser = async (req: Request, res: Response): Promise<any> => {
  const { username, password, email, account_creation_date } = req.body;

  // querying to ensure the username and email DNE in the database
  try {
    const userQuery = await pool.query(usernameExists, [username]);
    const emailQuery = await pool.query(emailExists, [email]);

    if (userQuery.rows.length) {
      return res.status(409).json("Username/Email Already Exists");
    } else if (emailQuery.rows.length) {
      return res.status(409).json("Username/Email Already Exists");
    } else {
      // asynchronously generating a salt and hashing the password before querying
      const saltRounds = 10;
      const salt = await genSalt(saltRounds);
      const password_hash = await hash(password, salt);
      await pool.query(registerUser, [
        username,
        password_hash,
        salt,
        email,
        account_creation_date,
      ]);
      res.status(201).json("User successfully added");
    }
  } catch (err) {
    res.status(500).json("User registration error");
  }
};

// this function is used to login a user with username/email and password.
const loginUser = (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  // querying  to ensure the username/email exists in the database
  const findUser = async (query: string, usernameOrEmail: string) => {
    try {
      const findUser = await pool.query(query, [usernameOrEmail]);

      if (findUser.rows.length) {
        const password_hash = findUser.rows[0].password_hash;
        const isCorrectPassword = await compare(password, password_hash);

        if (isCorrectPassword) {
          res.status(201).json("User successfully logged in");
        } else {
          res.status(401).json("Username/Email and/or Password Combo Incorrect");
        }
      } else {
        res.status(401).json("Username/Email and/or Password Combo Incorrect");
      }
    } catch (err) {
      res.status(500).json("Server error");
    }
  };

  // a null username signifies that the user is logging in with their email
  if (username === null) {
    findUser(emailExists, email);
  } else {
    findUser(usernameExists, username);
  }
};

export { addUser, loginUser };

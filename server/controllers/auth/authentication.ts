import { Request, Response } from "express";
import { compare } from "bcrypt";

import pool from "../../db";

import {
  getEntryByUsername,
  getEntryByEmail,
} from "../../queries/generalQueries";
import { setCookies } from "../../utils/authUtils";

const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { username, email, password } = req.body;

  const userLoggedInWithEmail = username === null ? true : false;

  try {
    const userEntry = userLoggedInWithEmail
      ? await pool.query(getEntryByEmail, [email])
      : await pool.query(getEntryByUsername, [username]);

    // querying to ensure the username/email exists in the database. if not
    // notify them that the username/email does not exist.
    if (userEntry.rows.length) {
      const server_password_hash = userEntry.rows[0].password_hash;
      const isCorrectPassword = await compare(password, server_password_hash);

      if (isCorrectPassword) {
        res.setHeader("set-Cookie", await setCookies(userEntry));
        res.status(201).json("Login successful!");
      } else {
        res.status(401).json("Password incorrect");
      }
    } else {
      res.status(401).json("Username/Email does not exist");
    }
  } catch (err) {
    res.status(500).json("Login error");
  }
};

const logoutUser = (req: Request, res: Response): void => {
  for (const cookie in req.cookies) {
    res.clearCookie(cookie);
  }
  res.status(200).send("user logged out");
};

export { loginUser, logoutUser };

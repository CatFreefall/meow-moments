import { Request, Response } from "express";
import pool from "../db";
import {
  registerUser,
  usernameExists,
  emailExists,
} from "../queries/authQueries";

// TODO: add e-mail verification
// duplicate emails and usernames need to be checked before adding the new user to the database.
// so query the database for the username and email given before adding the user.
const addUser = (req: Request, res: Response) => {
  const {
    username,
    password_hash,
    account_creation_date,
    last_posted,
    email,
    first_name,
    last_name,
  } = req.body;

  pool.query(usernameExists, [username], (err, results) => {
    if (results.rows.length) {
      return res.status(409).json("Username already exists");
    } else {
      pool.query(emailExists, [email], (err, results) => {
        if (results.rows.length) {
          return res.status(409).json("Email already exists");
        } else {
          pool.query(
            registerUser,
            [
              username,
              password_hash,
              account_creation_date,
              last_posted,
              email,
              first_name,
              last_name,
            ],
            (err, results) => {
              if (err) {
                throw err;
              }
              res.status(201).json("User successfully added");
            }
          );
        }
      });
    }
  });
};

export { addUser };

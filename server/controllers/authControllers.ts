import { Request, Response } from "express";
import { genSalt, hash } from "bcrypt";

import pool from "../db";
import {
  registerUser,
  usernameExists,
  emailExists,
} from "../queries/authQueries";

// TODO: add e-mail verification
const addUser = (req: Request, res: Response) => {
  const { username, password, email, account_creation_date } = req.body;

  // querying to ensure the username DNE in the database
  pool.query(usernameExists, [username], (err, results) => {
    if (results.rows.length) {
      return res.status(409).json("Username already exists");
    }

    // querying to ensure the email DNE in the database
    pool.query(emailExists, [email], (err, results) => {
      if (results.rows.length) {
        return res.status(409).json("Email already exists");
      }

      // asynchronously generating a salt and hashing the password before querying
      const saltRounds = 10;
      (async () => {
        const salt = await genSalt(saltRounds);
        const password_hash: String = await hash(password, salt);
        pool.query(
          registerUser,
          [username, password_hash, salt, email, account_creation_date],
          (err, results) => {
            if (err) {
              throw err;
            }
            res.status(201).json("User successfully added");
          }
        );
      })();
    });
  });
};

export { addUser };

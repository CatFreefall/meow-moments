import { Request, Response } from "express";
import { genSalt, hash, compare } from "bcrypt";
import nodemailer from "nodemailer";

import pool from "../db";
import {
  registerUser,
  usernameExists,
  emailExists,
} from "../queries/authQueries";

// TODO: add a "didn't recieve the email, click to resend" function
const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 465,
  secure: true,
  auth: {
    user: process.env.NODE_MAILER_HOST,
    pass: process.env.NODE_MAILER_PASSWORD,
  },
});

// TODO: create a proper email template and change link
// helper function to send a confirmation email to the user
const sendConfirmationEmail = (email: string): void => {
  const emailDetails: object = {
    from: process.env.NODE_MAILER_HOST,
    to: email,
    subject: "Confirm Your Meow Moments Account! 🐱",
    html: `
    <div>Hello, please confirm your account by clicking the link below.</div>
    <a href="http://localhost:3000/confirm/${email}">Confirm Account</a>
    `,
  };
  transporter.sendMail(emailDetails);
};

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
      return res.status(409).json("Username Already Exists");
    } else if (emailQuery.rows.length) {
      return res.status(409).json("Email Already Exists");
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
      res
        .status(201)
        .json(
          "Confirmation email sent. Please check your email and verify your account."
        );
      sendConfirmationEmail(email);
    }
  } catch (err) {
    res.status(500).json("User registration error");
  }
};

// TODO: rate limit login attempts
// this function is used to login a user with username/email and password.
const loginUser = (req: Request, res: Response): void => {
  const { username, email, password } = req.body;

  // querying  to ensure the username/email exists in the database
  const findUser = async (query: string, usernameOrEmail: string) => {
    try {
      const findUser = await pool.query(query, [usernameOrEmail]);

      if (findUser.rows.length) {
        const password_hash = findUser.rows[0].password_hash;
        const isCorrectPassword = await compare(password, password_hash);

        // sending back repsponses based on status codes.
        // responses for invalid password and invalid username/email are the same
        // to prevent users from finding out if a username/email exists in the database.
        if (isCorrectPassword) {
          if (findUser.rows[0].is_verified === false) {
            res
              .status(401)
              .json(
                "User is not verified. Please verify your account using the confirmation email sent."
              );
            sendConfirmationEmail(findUser.rows[0].email);
          } else {
            res.status(201).json("User successfully logged in");
          }
        } else {
          res.status(401).json("Password incorrect");
        }
      } else {
        res.status(401).json("Username/Email does not exist");
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

import { Request, Response } from "express";
import { genSalt, hash, compare } from "bcrypt";
import { createTransport } from "nodemailer";
import { Secret, sign, verify } from "jsonwebtoken";

import pool from "../db";
import {
  registerUser,
  getEntryByUsername,
  getEntryByEmail,
  changeVerifyStatus,
} from "../queries/authQueries";

// TODO: add a "didn't recieve the email, click to resend" function and rate limit
const transporter = createTransport({
  service: "gmail",
  port: 465,
  secure: true,
  auth: {
    user: process.env.NODE_MAILER_HOST,
    pass: process.env.NODE_MAILER_PASSWORD,
  },
});

// casting the secret to type Secret so that it can be used to sign the JWT
const verificationSecret: Secret = process.env.EMAIL_VERIFY_SECRET as Secret;

// helper function to sign a JWT. payload does not include iat and exp
const signJWT = (payload: string, secret: Secret): string => {
  const token = sign({ payload }, secret, {
    expiresIn: "1h",
  });
  return token;
};

// TODO: create a proper email template and change link
// helper function to send a confirmation email to the user
const sendConfirmationEmail = async (
  username: string,
  email: string
): Promise<void> => {
  const verificationToken = signJWT(email, verificationSecret);

  const emailDetails: object = {
    from: process.env.NODE_MAILER_HOST,
    to: email,
    subject: "Confirm Your Meow Moments Account! 🐱",
    html: `
    <div>Hello, please confirm your account by clicking the link below.</div>
    <a href="http://localhost:3000/confirm/${username}/${verificationToken}">Confirm Account</a>
    `,
  };
  await transporter.sendMail(emailDetails);
};

// TODO: add a password reset feature.
const addUser = async (req: Request, res: Response): Promise<any> => {
  const { username, password, email, account_creation_date } = req.body;

  // querying to ensure the username and email DNE in the database
  try {
    const userQuery = await pool.query(getEntryByUsername, [username]);
    const emailQuery = await pool.query(getEntryByEmail, [email]);

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
      sendConfirmationEmail(username, email);
    }
  } catch (err) {
    res.status(500).json("User registration error");
  }
};

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
            sendConfirmationEmail(
              findUser.rows[0].username,
              findUser.rows[0].email
            );
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
    findUser(getEntryByEmail, email);
  } else {
    findUser(getEntryByUsername, username);
  }
};

const verifyUser = async (req: Request, res: Response): Promise<void> => {
  console.log("verification link expired");
  // check if token is expired or not. If not, update status of user in database to verified
  // if yes, the token is destructured and the verification status of the entry with the email
  // is changed to true.
  const username = req.params.username;

  try {
    verify(req.params.token, verificationSecret);

    res.status(200).send("user verified");
    await pool.query(changeVerifyStatus, [username]);
    console.log("fart");
  } catch {
    res
      .status(200)
      .send(
        "verification link has expired. please verify using the new verification link sent."
      );
    const dataEntry = await pool.query(getEntryByUsername, [username]);
    const email = dataEntry.rows[0].email;
    // sendConfirmationEmail(username, email);
  }
};

const resetPassword = async (req: Request, res: Response): Promise<void> => {
  const { email } = req.body;
  const resetToken = signJWT(email, verificationSecret);

  const emailDetails: object = {
    from: process.env.NODE_MAILER_HOST,
    to: email,
    subject: "Reset Your Meow Moments Account Password! 🐱",
    html: `
    <div>Hello, please click on the link provided below to reset your account password</div>
    <a href="http://localhost:3000/password-reset/${resetToken}">Reset Password</a>
    `,
  };
  await transporter.sendMail(emailDetails);
};

export { addUser, loginUser, verifyUser, resetPassword };

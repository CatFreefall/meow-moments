import { Request, Response } from "express";
import { genSalt, hash } from "bcrypt";
import { Secret } from "jsonwebtoken";

import pool from "../../db";

import { changeDBPassword } from "../../queries/authQueries";
import { getEntryByEmail, getEntryByUsername } from "../../queries/generalQueries";

import { transporter, signJWT, validToken } from "../../utils/authUtils";

const forgotPasswordSecret: Secret = process.env
  .FORGOT_PASSWORD_SECRET as Secret;

// this is the number of rounds bcrypt will use to generate a salt
const saltRounds = 10;

// helper function to send a password reset email to the user
const sendPasswordResetEmail = async (
  email: string,
  username: string
): Promise<void> => {
  const resetToken = signJWT({ email }, forgotPasswordSecret, "1h");

  const emailDetails: object = {
    from: process.env.NODE_MAILER_HOST,
    to: email,
    subject: "Reset Your Meow Moments Account Password! 🐱",
    html: `
    <div>Hello, please click on the link provided below to reset your account password</div>
    <a href="http://localhost:3000/password-reset-req/${username}/${resetToken}">Reset Password</a>
    `,
  };

  // a null email signifies that the user DNE in the database
  email === "" ? null : await transporter.sendMail(emailDetails);
};

const updateDBPassword = async (
  username: string,
  newPassword: string
): Promise<void> => {
  const newSalt = await genSalt(saltRounds);
  const newPasswordHash = await hash(newPassword, newSalt);

  pool.query(changeDBPassword, [newPasswordHash, username]);
};

const resetPasswordReq = async (req: Request, res: Response): Promise<void> => {
  const { username, email } = req.body;
  let emailRecipient: string = "";
  let userUsername: string = "";

  // getting the user email based on whether the user is logging in with their username or email
  try {
    if (username === null) {
      const emailExists = await pool.query(getEntryByEmail, [email]);

      if (emailExists.rows.length) {
        emailRecipient = email;
        userUsername = emailExists.rows[0].username;
      }
    } else {
      const userEntry = await pool.query(getEntryByUsername, [username]);

      if (userEntry.rows.length) {
        emailRecipient = userEntry.rows[0].email;
        userUsername = username;
      }
    }
  } catch (err) {
    res.status(500).json("Password reset request error");
  }

  sendPasswordResetEmail(emailRecipient, userUsername);

  res
    .status(200)
    .send("If a user with that email exists, an email has been sent to them.");
};

const changePassword = async (req: Request, res: Response): Promise<void> => {
  // if a token is not provided, the user is changing their password through the settings page
  try {
    if (validToken(req.params.token, forgotPasswordSecret)) {
      await updateDBPassword(req.params.user, req.body.newPassword);

      res.status(200).send("password changed through email link!");
    } else {
      res
        .status(200)
        .send(
          "This password reset link has expired. Please request a new one."
        );
    }
  } catch {
    res.status(500).json("Password change through settings");
  }
};

export { resetPasswordReq, changePassword };

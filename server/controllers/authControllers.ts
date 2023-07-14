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
  changeDBPassword,
} from "../queries/authQueries";

// TODO: add a "didn't recieve the email, click to resend" function
const transporter = createTransport({
  service: "gmail",
  port: 465,
  secure: true,
  auth: {
    user: process.env.NODE_MAILER_HOST,
    pass: process.env.NODE_MAILER_PASSWORD,
  },
});

// casting the secrets to type Secret so that they can be used to sign JWT's
const verificationSecret: Secret = process.env.EMAIL_VERIFY_SECRET as Secret;
const forgotPasswordSecret: Secret = process.env
  .FORGOT_PASSWORD_SECRET as Secret;
const refreshTokenSecret: Secret = process.env.REFRESH_TOKEN_SECRET as Secret;
const accessTokenSecret: Secret = process.env.ACCESS_TOKEN_SECRET as Secret;

// this is the number of rounds bcrypt will use to generate a salt
const saltRounds = 10;

// helper function to sign a JWT. payload variable only includes email
// this is only used for email verificationm, password reset request, and access tokens
const signJWT = (payload: object, secret: Secret, expAfter: string): string => {
  const token = sign({ payload }, secret, {
    expiresIn: expAfter,
  });
  return token;
};

// TODO: create a proper email template
// helper function to send a confirmation email to the user
const sendConfirmationEmail = async (
  username: string,
  email: string
): Promise<void> => {
  const verificationToken = signJWT({ email }, verificationSecret, "1h");

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

//helper function to determine if a JWT is expired/invalid or valid
const validToken = (token: string, secret: Secret): boolean => {
  try {
    verify(token, secret);
  } catch {
    return false;
  }
  return true;
};

// generates a refresh token
const getRefreshToken = (payload: object): string => {
  const refreshToken = signJWT(payload, refreshTokenSecret, "1y");
  return refreshToken;
};

const getAccessToken = async (
  payload: object,
  refreshToken: string
): Promise<String> => {
  // verifying the refresh token. if valid, generate and return a new access token
  // if not valid, return an empty string
  try {
    verify(refreshToken, refreshTokenSecret);

    const accessToken = signJWT(payload, accessTokenSecret, "15m");
    return accessToken;
  } catch {
    return "";
  }
};

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

const loginUser = (req: Request, res: Response): void => {
  const { username, email, password } = req.body;

  // querying  to ensure the username/email exists in the database
  const login = async (query: string, usernameOrEmail: string) => {
    try {
      const login = await pool.query(query, [usernameOrEmail]);

      if (login.rows.length) {
        const password_hash = login.rows[0].password_hash;
        const isCorrectPassword = await compare(password, password_hash);

        if (isCorrectPassword) {
          const userEmail: string = login.rows[0].email;
          const userUsername: string = login.rows[0].username;
          const payload: object = {
            username: userUsername,
            email: userEmail,
          };

          const refreshToken = getRefreshToken(payload);
          const accessToken = await getAccessToken(payload, refreshToken);

          res.setHeader("set-Cookie", [
            `user=${userUsername}; SameSite=Lax`,
            `refresh_token=${refreshToken}; HttpOnly; Secure; SameSite=Lax`,
            `access_token=${accessToken}; HttpOnly; Secure; SameSite=Lax`,
          ]);
          res.status(201).json("Login successful!");
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
    login(getEntryByEmail, email);
  } else {
    login(getEntryByUsername, username);
  }
};

const verifyUser = async (req: Request, res: Response): Promise<void> => {
  const username = req.params.username;

  if (validToken(req.params.token, verificationSecret)) {
    res.status(200).send("user verified");
    await pool.query(changeVerifyStatus, [username]);
  } else {
    res.status(200).send("verification link expired.");
  }
};

const resetPasswordReq = async (req: Request, res: Response): Promise<void> => {
  const { username, email } = req.body;
  let emailRecipient: string = "";
  let userUsername: string = "";

  // getting the user email based on whether the user is logging in with their username or email
  if (username === null) {
    const emailExists = await pool.query(getEntryByEmail, [email]);

    if (emailExists.rows.length) {
      emailRecipient = email;
      userUsername = emailExists.rows[0].username;
    }
  } else {
    const userEmail = await pool.query(getEntryByUsername, [username]);

    if (userEmail.rows.length) {
      emailRecipient = userEmail.rows[0].email;
      userUsername = username;
    }
  }

  sendPasswordResetEmail(emailRecipient, userUsername);

  res
    .status(200)
    .send("If a user with that email exists, an email has been sent to them.");
};

const updateDBPassword = async (
  username: string,
  password: string
): Promise<void> => {
  const newSalt = await genSalt(saltRounds);
  const newPasswordHash = await hash(password, newSalt);

  await pool.query(changeDBPassword, [newPasswordHash, newSalt, username]);
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
    console.log("password change through settings");
  }
};

const logoutUser = (req: Request, res: Response): void => {
  res.clearCookie("refresh_token", { sameSite: "lax" });
  res.clearCookie("access_token", { sameSite: "lax" });
  res.clearCookie("user", { sameSite: "lax" });
  res.status(200).send("user logged out");
};

export {
  addUser,
  loginUser,
  verifyUser,
  resetPasswordReq,
  changePassword,
  logoutUser,
};

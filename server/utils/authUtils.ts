import { createTransport } from "nodemailer";
import { Secret, sign, verify } from "jsonwebtoken";

import pool from "../db";
import { getEntryByUsername } from "../queries/authQueries";

const refreshTokenSecret: Secret = process.env.REFRESH_TOKEN_SECRET as Secret;
const accessTokenSecret: Secret = process.env.ACCESS_TOKEN_SECRET as Secret;

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

// helper function to sign a JWT. payload variable only includes email
// this is only used for email verificationm, password reset request, and access tokens
const signJWT = (payload: object, secret: Secret, expAfter: string): string => {
  const token = sign({ payload }, secret, {
    expiresIn: expAfter,
  });
  return token;
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

const getRefreshToken = (payload: object): string => {
  const refreshToken = signJWT(payload, refreshTokenSecret, "1y");
  return refreshToken;
};

const getAccessToken = (payload: object): string => {
  const accessToken = signJWT(payload, accessTokenSecret, "30m");
  return accessToken;
};

const userVerified = async (username: string): Promise<boolean> => {
  const user = await pool.query(getEntryByUsername, [username]);
  return user.rows[0].is_verified ? true : false;
};

export {
  transporter,
  signJWT,
  validToken,
  getRefreshToken,
  getAccessToken,
  userVerified,
};

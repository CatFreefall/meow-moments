import { Secret, sign, verify } from "jsonwebtoken";
import { QueryResult } from "pg";

import pool from "../db";
import { getEntryByUsername } from "../queries/generalQueries";

const refreshTokenSecret: Secret = process.env.REFRESH_TOKEN_SECRET as Secret;
const accessTokenSecret: Secret = process.env.ACCESS_TOKEN_SECRET as Secret;

// TODO: add a "didn't recieve the email, click to resend" function

// helper function to sign a JWT. payload variable only includes email
// this is only used for email verificationm, password reset request, and access tokens
const signJWT = (payload: object, secret: Secret, expAfter: string): string => {
  const token = sign({ payload }, secret, {
    expiresIn: expAfter,
  });
  return token;
};

//helper function to determine if a JWT is expired/invalid or valid
const isValidToken = (token: string, secret: Secret): boolean => {
  try {
    verify(token, secret);
  } catch {
    return false;
  }
  return true;
};

const generateRefreshToken = (payload: object): string => {
  const refreshToken = signJWT(payload, refreshTokenSecret, "1y");
  return refreshToken;
};

const generateAccessToken = (payload: object): string => {
  const accessToken = signJWT(payload, accessTokenSecret, "30m");
  return accessToken;
};

const userIsVerified = async (username: string): Promise<boolean> => {
  const user = await pool.query(getEntryByUsername, [username]);
  return user.rows[0].is_verified ? true : false;
};

// generates cookie specificly for authorization. may be altered to include other cookies later.
const setCookies = async (userEntry: QueryResult): Promise<string[]> => {
  const { username, email, isVerified } = userEntry.rows[0];

  const accessPayload: object = {
    username: username,
  };
  const refreshPayload: object = {
    username: username,
    email: email,
  };
  const accessToken = generateAccessToken(accessPayload);
  const refreshToken = generateRefreshToken(refreshPayload);

  return [
    `user=${username}; SameSite=lax`,
    `verified=${isVerified}; SameSite=lax`,
    `refresh_token=${refreshToken}; HttpOnly; Secure; SameSite=Strict`,
    `access_token=${accessToken}; HttpOnly; Secure; SameSite=Strict`,
  ];
};

export {
  signJWT,
  isValidToken,
  generateRefreshToken,
  generateAccessToken,
  userIsVerified,
  setCookies,
};

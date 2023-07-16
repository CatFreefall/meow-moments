import { Request, Response } from "express";
import { compare } from "bcrypt";
import { Secret, verify } from "jsonwebtoken";

import pool from "../../db";

import { getEntryByUsername, getEntryByEmail } from "../../queries/authQueries";

import { getAccessToken, getRefreshToken } from "../../utils/authUtils";

// generates cookie specificly for authorization. may be altered to include other cookies later.
const setAuthCookie = async (
  userEntry: any
): Promise<string | number | readonly string[]> => {
  const userEmail: string = userEntry.rows[0].email;
  const userUsername: string = userEntry.rows[0].username;
  const payload: object = {
    username: userUsername,
  };
  const refreshToken = getRefreshToken(payload);
  const accessToken = await getAccessToken(payload);

  return [
    `user=${userUsername}; SameSite=lax`,
    `refresh_token=${refreshToken}; HttpOnly; Secure; SameSite=Strict`,
    `access_token=${accessToken}; HttpOnly; Secure; SameSite=Strict`,
  ];
};

const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { username, email, password } = req.body;

  const loggedInWithEmail = username === null ? true : false;

  try {
    const userEntry = loggedInWithEmail
      ? await pool.query(getEntryByEmail, [email])
      : await pool.query(getEntryByUsername, [username]);

    // querying  to ensure the username/email exists in the database
    if (userEntry.rows.length) {
      const server_password_hash = userEntry.rows[0].password_hash;
      const isCorrectPassword = await compare(password, server_password_hash);

      if (isCorrectPassword) {
        res.setHeader("set-Cookie", await setAuthCookie(userEntry));
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
  res.clearCookie("refresh_token", { sameSite: "strict" });
  res.clearCookie("access_token", { sameSite: "strict" });
  res.clearCookie("user", { sameSite: "lax" });
  res.status(200).send("user logged out");
};

export { loginUser, logoutUser };

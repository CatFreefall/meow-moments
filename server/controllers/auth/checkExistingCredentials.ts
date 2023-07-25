import { Request, Response } from "express";

import { getEntryByEmail, getEntryByUsername } from "../../queries/authQueries";
import pool from "../../db";

const usernameExists = async (req: Request, res: Response): Promise<void> => {
  const username = req.params.username;

  try {
    const usernameQuery = await pool.query(getEntryByUsername, [username]);
    usernameQuery.rows.length
      ? res.json("Username Already Exists.")
      : res.json("");
  } catch (err) {
    throw err;
  }
};

const emailExists = async (req: Request, res: Response): Promise<any> => {
  const email = req.params.email;

  try {
    const emailQuery = await pool.query(getEntryByEmail, [email]);
    emailQuery.rows.length
      ? res.status(409).json("Email Already Exists.")
      : res.status(200).json("");
  } catch (err) {
    throw err;
  }
};

export { usernameExists, emailExists };

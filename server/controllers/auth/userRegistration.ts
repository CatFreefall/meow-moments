import { Request, Response } from "express";
import { genSalt, hash } from "bcrypt";
import { Secret } from "jsonwebtoken";

import pool from "../../db";
import { meowMomentsBucket } from "../../utils/bucketUtils";

import { registerUser, changeVerifyStatus } from "../../queries/authQueries";
import { getEntryByEmail, getEntryByUsername } from "../../queries/generalQueries";

import { signJWT, transporter, validToken } from "../../utils/authUtils";

// casting the secrets to type Secret so that they can be used to sign JWT's
const verificationSecret: Secret = process.env.EMAIL_VERIFY_SECRET as Secret;

// this is the number of rounds bcrypt will use to generate a salt
const saltRounds = 10;

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
        email,
        account_creation_date,
      ]);
      res
        .status(201)
        .json(
          "Confirmation email sent. Please check your email and verify your account."
        );
      sendConfirmationEmail(username, email);

      // creating empty directories in the bucket for the user upon registration
      const directories = ["illustrations", "videos", "photos"];
      for (const directory of directories) {
        const directoryPath = `${username}/${directory}/`;
        await meowMomentsBucket.file(directoryPath).save("");
      }
    }
  } catch (err) {
    res.status(500).json("User registration error");
  }
};

const verifyUser = async (req: Request, res: Response): Promise<void> => {
  const username = req.params.username;

  if (validToken(req.params.token, verificationSecret)) {
    res.status(200).send(true);
    await pool.query(changeVerifyStatus, [username]);
  } else {
    res.status(200).send(false);
  }
};

export { addUser, verifyUser };

import { createTransport } from "nodemailer";
import { Secret, sign, verify } from "jsonwebtoken";

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

export { transporter, signJWT, validToken };

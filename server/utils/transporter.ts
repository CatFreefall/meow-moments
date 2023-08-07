import { createTransport } from "nodemailer";

const transporter = createTransport({
  service: "gmail",
  port: 465,
  secure: true,
  auth: {
    user: process.env.NODE_MAILER_HOST,
    pass: process.env.NODE_MAILER_PASSWORD,
  },
});

export default transporter;

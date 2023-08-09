import express from "express";
import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser";

import * as authRoutes from "./routes/authRoutes";
import * as postsRoutes from "./routes/postsRoutes";
import * as profileRoutes from "./routes/profileRoutes";

//TODO: generate a self signed certificate and use HTTPS
const app = express();
const port = 5000;

// rate limiting users at all endpoints.
const limit = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 10000,
  message: "You have made too many requests. Please try again in 5 minutes.",
});
app.use("*", limit);

app.use(express.json());

app.use(cookieParser());

app.use("/", authRoutes.default);
app.use("/", postsRoutes.default);
app.use("/", profileRoutes.default);

app.listen(port, () => {
  console.log(`Server running on port http://www.localhost:${port}`);
});

import express from "express";
import rateLimit from "express-rate-limit";
import cookieParser from "cookie-parser";

import routes from "./routes/authRoutes";

//TODO: generate a self signed certificate and use HTTPS
const app = express();
const port = 5000;

// rate limiting users at all endpoints.
const limit = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 1000,
  message: "You have made too many requests. Please try again in 5 minutes.",
});
app.use("/register", limit);
app.use("/login", limit);
app.use("/confirm", limit);
app.use("password-reset-req", limit);
app.use("/password-reset", limit);
app.use("/logout", limit);
app.use("/authorization-request", limit);

app.use(express.json());
app.use(cookieParser());

app.use("/", routes);

app.listen(port, () => {
  console.log(`Server running on port http://www.localhost:${port}`);
});

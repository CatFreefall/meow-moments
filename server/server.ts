import express from "express";
import rateLimit from "express-rate-limit";

import routes from "./routes/authRoutes";

// const attrs = [{ name: "commonName", value: "localhost" }];
// const { private: privateKey, cert: certificate } = selfsigned.generate(attrs, {
//   days: 365,
// });

const app = express();
const port = 5000;

// rate limiting users at certain endpoints.
const limit = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 30,
  message: "You have made too many requests. Please try again in 5 minutes.",
});
app.use("/login", limit);
app.use("/register", limit);

app.use(express.json());

app.use("/", routes);

// const server = https.createServer({ key: privateKey, cert: certificate }, app);

app.listen(port, () => {
  console.log(`Server running on port http://www.localhost:${port}`);
});

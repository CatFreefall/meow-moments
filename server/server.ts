import express from "express";
import rateLimit from "express-rate-limit";

import routes from "./routes/authRoutes";

//TODO: generate a self signed certificate and use HTTPS
const app = express();
const port = 5000;

// rate limiting users at all endpoints.
const limit = rateLimit({
  windowMs: 5 * 60 * 1000,
  max: 100,
  message: "You have made too many requests. Please try again in 5 minutes.",
});
app.use("*", limit);

app.use(express.json());

app.use("/", routes);

app.listen(port, () => {
  console.log(`Server running on port http://www.localhost:${port}`);
});

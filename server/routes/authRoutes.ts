import { Router } from "express";
import {
  addUser,
  loginUser,
  verifyUser,
  resetPassword,
} from "../controllers/authControllers";

const router = Router();

router.post("/register", addUser);

router.post("/login", loginUser);

router.post("/confirm/:username/:token", verifyUser);

router.post("/password-reset", resetPassword);

export default router;

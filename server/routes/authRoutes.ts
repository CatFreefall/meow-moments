import { Router } from "express";
import {
  addUser,
  loginUser,
  verifyUser,
  resetPasswordReq,
  changePassword,
  logoutUser,
} from "../controllers/authControllers";

const router = Router();

router.post("/register", addUser);

router.post("/login", loginUser);

router.get("/confirm/:username/:token", verifyUser);

router.post("/password-reset-req", resetPasswordReq);
router.put("/password-reset/:user/:token", changePassword);

router.get("/logout", logoutUser);

export default router;

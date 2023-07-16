import { Router } from "express";

import { addUser, verifyUser } from "../controllers/auth/userRegistration"
import { loginUser, logoutUser } from "../controllers/auth/authentication"
import { resetPasswordReq, changePassword } from "../controllers/auth/passwordReset"
import { verifyCookies } from "../controllers/auth/authorization"

const router = Router();

router.post("/register", addUser);

router.post("/login", loginUser);

router.get("/confirm/:username/:token", verifyUser);

router.post("/password-reset-req", resetPasswordReq);
router.put("/password-reset/:user/:token", changePassword);

router.get("/logout", logoutUser);

router.get("/auth-request", verifyCookies);

export default router;

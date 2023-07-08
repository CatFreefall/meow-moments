import { Router } from "express";
import { addUser, loginUser, verifyUser } from "../controllers/authControllers";

const router = Router();

router.post("/register", addUser);

router.post("/login", loginUser);

router.post("/confirm/:token", verifyUser);

export default router;

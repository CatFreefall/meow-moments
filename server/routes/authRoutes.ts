import { Router } from "express";
import { addUser, loginUser } from "../controllers/authControllers";

const router = Router();

router.post("/register", addUser);

router.post("/login", loginUser);

router.get("/confirm/:token", loginUser);

export default router;

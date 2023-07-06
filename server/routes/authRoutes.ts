import { Router } from "express";
import { addUser } from "../controllers/authControllers";

const router = Router();

router.post("/register", addUser);

router.post("/login", addUser);

export default router;

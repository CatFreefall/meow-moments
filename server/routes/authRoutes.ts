import { Router } from "express";
import { getData } from "../controllers/authControllers";

const router = Router();

router.get("/", getData);

export default router;
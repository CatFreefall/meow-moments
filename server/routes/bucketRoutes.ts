import { Router } from "express";
import Multer from "multer";

import { post } from "../controllers/bucket/post";

const router = Router();

const multer = Multer({
  storage: Multer.memoryStorage(),
});

router.post("/post/:postType", multer.array("files"), post);

export default router;

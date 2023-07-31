import { Router } from "express";
import Multer from "multer";

import post from "../controllers/content/post";
import getContent from "../controllers/content/getContent";

const router = Router();

const multer = Multer({
  storage: Multer.memoryStorage(),
});

router.post("/post/:postType", multer.array("files"), post);

router.get("/getContent/:contentType/:sortBy", getContent);

export default router;

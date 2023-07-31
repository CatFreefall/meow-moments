import { Router } from "express";
import Multer from "multer";

import post from "../controllers/content/post";
import getContent from "../controllers/content/getContent";
import { toggleLiked } from "../controllers/content/likes";

const router = Router();

const multer = Multer({
  storage: Multer.memoryStorage(),
});

router.post("/post/:postType", multer.array("files"), post);

router.get("/getContent/:contentType/:sortBy", getContent);

router.put("/toggle-liked-post", toggleLiked);

export default router;

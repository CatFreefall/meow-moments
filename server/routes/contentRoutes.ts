import { Router } from "express";
import Multer from "multer";

import { post } from "../controllers/content/posts";
import getContent from "../controllers/content/getContent";
import {
  toggleLiked,
  getLikedState,
  getTotalLikes,
} from "../controllers/content/likes";

const router = Router();

const multer = Multer({
  storage: Multer.memoryStorage(),
});

router.post("/post/:postType", multer.array("files"), post);

router.get("/getContent/:contentType/:sortBy", getContent);

router.put("/toggle-liked-post/:postId", toggleLiked);
router.get("/get-liked-state/:postId", getLikedState);
router.get("/get-total-likes/:postId", getTotalLikes);

export default router;

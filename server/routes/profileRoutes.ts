import { Router } from "express";
import Multer from "multer";

const router = Router();

const multer = Multer({
  storage: Multer.memoryStorage(),
});

import {
  getProfile,
  getUserPosts,
} from "../controllers/content/getProfileInfo";
import { changeProfilePicture } from "../controllers/content/changeProfileInfo";

router.get("/profile/:username", getProfile);
router.get("/user-posts/:username", getUserPosts);
router.post(
  "/change-profile",
  multer.single("new-profile-picture"),
  changeProfilePicture
);

export default router;

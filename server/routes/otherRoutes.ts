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
import { deletePost } from "../controllers/content/posts";
import {
  sendVerificationEmail,
} from "../controllers/auth/userRegistration";

router.get("/profile/:username", getProfile);
router.get("/user-posts/:username", getUserPosts);
router.post(
  "/change-profile",
  multer.single("new-profile-picture"),
  changeProfilePicture
);
router.delete("/delete-post/:postId", deletePost);

router.post("/send-confirmation-email/:username", sendVerificationEmail);

export default router;

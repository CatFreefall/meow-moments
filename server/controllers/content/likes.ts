import { Request, Response } from "express";
import generateUUID from "../../utils/generateUUID";

import pool from "../../db";
import {
  getPostLikes,
  deletePostLike,
  addPostLike,
} from "../../queries/contentQueries";
import { getEntryByUsername } from "../../queries/generalQueries";


const getLikedState = async (req: Request, res: Response) => {
  
}


const toggleLiked = async (req: Request, res: Response) => {
  const { postId } = req.body;
  const { user } = req.cookies;

  // getting user_id and checking if user has already liked the post
  const user_id = (await pool.query(getEntryByUsername, [user])).rows[0].id;
  const isLiked =
    (await pool.query(getPostLikes, [postId, user_id])).rows.length > 0;

  // toggling the like based on if the user has already liked the post
  if (isLiked) await pool.query(deletePostLike, [postId, user_id]);
  else {
    const like_id = generateUUID();
    await pool.query(addPostLike, [like_id, postId, user_id]);
  }

  res.json(!isLiked);
};

export { toggleLiked };

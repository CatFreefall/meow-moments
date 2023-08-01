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
  try {
    const { postId } = req.params;
    const { user } = req.cookies;

    // getting the user_id then checking if they have liked the post or not.
    const userId = (await pool.query(getEntryByUsername, [user])).rows[0].id;
    const isLiked =
      (await pool.query(getPostLikes, [postId, userId])).rows.length === 0
        ? false
        : true;

    res.status(200).json(isLiked);
  } catch (err) {
    res.status(500).json(`Server Error: ${err}`);
  }
};

const toggleLiked = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;
    const { user } = req.cookies;

    // getting user_id and checking if user has already liked the post
    const userId = (await pool.query(getEntryByUsername, [user])).rows[0].id;
    const isLiked =
      (await pool.query(getPostLikes, [postId, userId])).rows.length > 0;

    // toggling the like based on if the user has already liked the post
    if (isLiked) await pool.query(deletePostLike, [postId, userId]);
    else {
      const like_id = generateUUID();
      await pool.query(addPostLike, [like_id, postId, userId]);
    }
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json(`Server Error: ${err}`);
  }
};

export { toggleLiked, getLikedState };

import { Request, Response } from "express";
import generateUUID from "../../utils/generateUUID";

import pool from "../../db";
import {
  postLikedByUser,
  removePostLike,
  addPostLike,
} from "../../queries/postsQueries";
import { getEntryByUsername } from "../../queries/generalQueries";
import { getPostLikes } from "../../queries/postsQueries";

const getLikedState = async (req: Request, res: Response) => {
  try {
    const { postId } = req.params;
    const { user } = req.cookies;

    // getting the user_id then checking if they have liked the post or not.
    const userId = (await pool.query(getEntryByUsername, [user])).rows[0].id;
    const isLiked =
      (await pool.query(postLikedByUser, [postId, userId])).rows.length === 0
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
      (await pool.query(postLikedByUser, [postId, userId])).rows.length > 0;

    // toggling the like based on if the user has already liked the post
    if (isLiked) await pool.query(removePostLike, [postId, userId]);
    else {
      const like_id = generateUUID();
      await pool.query(addPostLike, [like_id, postId, userId]);
    }
    res.sendStatus(204);
  } catch (err) {
    res.status(500).json(`Server Error: ${err}`);
  }
};

const getTotalLikes = async (req: Request, res: Response) => {
  const postID = req.params.postId;
  const totalPostLikes = (await pool.query(getPostLikes, [postID])).rows.length;

  res.status(200).json(totalPostLikes);
};

export { toggleLiked, getLikedState, getTotalLikes };

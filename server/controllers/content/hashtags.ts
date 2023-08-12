import { Request, Response } from "express";

import pool from "../../db";
import { getAllTags, getPostIDs } from "../../queries/hashtagQueries";
import { getPostLikes } from "../../queries/postsQueries";

import totalTagLikes from "../../utils/totalTagLikes";

const getHashtags = async (req: Request, res: Response) => {
  const tags = (await pool.query(getAllTags)).rows;

  const tagLikes = new totalTagLikes();

  for (const tag in tags) {
    const tagID = tags[tag].tag_id;
    const tagName = tags[tag].tag_name;

    const postID = (await pool.query(getPostIDs, [tagID])).rows;

    for (const id in postID) {
      const postLikes = (await pool.query(getPostLikes, [postID[id].post_id]))
        .rows.length;
      tagLikes.addEntry(tagName, postLikes);
    }
  }
  res.json(tagLikes);
};

export { getHashtags };

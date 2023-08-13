import { Request, Response } from "express";

import pool from "../../db";
import { getAllTags, getPostsByID } from "../../queries/hashtagQueries";
import { getPostLikes } from "../../queries/postsQueries";

import totalTagLikes from "../../utils/totalTagLikes";

const getHashtags = async (req: Request, res: Response) => {
  const tags = (await pool.query(getAllTags)).rows;

  const tagLikes = new totalTagLikes();

  for (const tag in tags) {
    const tagID = tags[tag].tag_id;
    const tagName = tags[tag].tag_name;

    const posts = (await pool.query(getPostsByID, [tagID])).rows;

    for (const id in posts) {
      const postLikes = (await pool.query(getPostLikes, [posts[id].post_id]))
        .rows.length;
      tagLikes.addEntry(tagName, postLikes);
    }
  }
  res.json(tagLikes);
};

export { getHashtags };

import { Request, Response } from "express";

import pool from "../../db";
import { getPostsByRecent } from "../../queries/contentQueries";
import { getEntryByID } from "../../queries/generalQueries";
import { meowMomentsBucket } from "../../utils/bucketUtils";
import { format } from "path";

const getContent = async (req: Request, res: Response) => {
  try {
    console.log("test 1 passed");
    const { contentType, sortBy } = req.params;
    const recentPosts =
      sortBy === "recent"
        ? await pool.query(getPostsByRecent, [contentType])
        : await pool.query(getPostsByRecent, [contentType]);

    type formattedContentType = {
      username: string;
      date_posted: Date;
      mediaFiles: File[];
      description: string;
    };
    console.log("test 2 passed");
    const formattedContentPromises = recentPosts.rows.map(async (post) => {
      const username = (await pool.query(getEntryByID, [post.user_id])).rows[0]
        .username;
      const date_posted = post.date_posted;
      const mediaFiles = await meowMomentsBucket.getFiles({
        prefix: post.post_folder_path,
      });
      const description = post.description;
      return { username, date_posted, mediaFiles, description };
    });
    const formattedContent = await Promise.all(formattedContentPromises);
    console.log(formattedContent);
    console.log("test 3 passed");
    res.json(formattedContent);
    console.log("test 4 passed");
  } catch (err) {
    res.status(500).json(err);
  }
};

export default getContent;

import { Request, Response } from "express";

import pool from "../../db";
import { getPostsByRecent } from "../../queries/contentQueries";
import { getEntryByID } from "../../queries/generalQueries";
import { meowMomentsBucket } from "../../utils/bucketUtils";
import { exit } from "process";

const getContent = async (req: Request, res: Response) => {
  try {
    // TODO: add a getPostsByPopular query
    // determining if the user requested to sort by recent or popular.
    const { contentType, sortBy } = req.params;
    const dbPostsRows =
      sortBy === "recent"
        ? await pool.query(getPostsByRecent, [contentType])
        : await pool.query(getPostsByRecent, [contentType]);

    // iterating through all rows in the array and putting all the data together to
    // send back to the client
    const formattedContentPromises = dbPostsRows.rows.map(async (post) => {
      const username = (await pool.query(getEntryByID, [post.user_id])).rows[0]
        .username;

      const date_posted = post.date_posted;

      //TODO: load only a certain number of posts at a time.
      // some posts may have more than one media file. my bucket is private, so
      // I need to create temporary signed URLs to access each file in each post.
      // signed URLs are better than sending back the images/videos directly
      // as it is much quicker and I can perhaps do lazy loading of the media files.
      const mediaFiles = await meowMomentsBucket.getFiles({
        prefix: post.post_folder_path,
      });
      const mediaFileURLs = await Promise.all(
        mediaFiles[0].map(async (file) => {
          const signedURL = await file.getSignedUrl({
            action: "read",
            expires: Date.now() + 1000 * 60 * 30,
          });
          return signedURL[0];
        })
      );
      const description = post.description;
      const post_id = post.post_id;

      return { username, date_posted, mediaFileURLs, description, post_id };
    });
    const formattedContent = await Promise.all(formattedContentPromises);

    res.json(formattedContent);
  } catch (err) {
    res.status(500).json(err);
  }
};

export default getContent;

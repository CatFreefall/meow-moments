import { Request, Response } from "express";

import pool from "../../db";
import { getEntryByUsername } from "../../queries/generalQueries";
import {
  getPostLikes,
  getPostsByRecent,
  getPostsByUserID,
  getPostsByPostID,
} from "../../queries/postsQueries";
import { getEntryByID } from "../../queries/generalQueries";
import { getTagByID } from "../../queries/hashtagQueries";
import {
  getPostHashtags,
  getTagByName,
  getPostsByID,
} from "../../queries/hashtagQueries";
import { meowMomentsBucket } from "../../utils/bucket";
import { QueryResult } from "pg";
import { formattedContentType } from "../../utils/formattedContentType";

const getContent = async (req: Request, res: Response) => {
  try {
    // determining if the user requested to sort by recent or popular.
    const { category, categoryValue } = req.params;
    let dbPostsRows: QueryResult[] = [];

    if (category === "mediaType") {
      dbPostsRows.push(await pool.query(getPostsByRecent, [categoryValue]));
    } else if (category === "user") {
      const userID = (await pool.query(getEntryByUsername, [categoryValue]))
        .rows[0].id;
      dbPostsRows.push(await pool.query(getPostsByUserID, [userID]));
    } else {
      const tagID = (await pool.query(getTagByName, [categoryValue])).rows[0]
        .tag_id;
      const posts = (await pool.query(getPostsByID, [tagID])).rows;
      for (const post of posts) {
        dbPostsRows.push(await pool.query(getPostsByPostID, [post.post_id]));
      }
    }

    // iterating through all rows in the array and putting all the data together to
    // send back to the client
    const formattedContentArray: formattedContentType[] = [];

    for (const index in dbPostsRows) {
      const formattedContentPromises = dbPostsRows[index].rows.map(
        async (post) => {
          const username = (await pool.query(getEntryByID, [post.user_id]))
            .rows[0].username;

          const profilePicturePath = await meowMomentsBucket.getFiles({
            prefix: `${username}/profile/profile-picture.webp`,
          });
          const profilePictureURL = await profilePicturePath[0][0].getSignedUrl(
            {
              action: "read",
              expires: Date.now() + 1000 * 60 * 30,
            }
          );

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
                expires: Date.now() + 1000 * 60 * 1,
              });
              return signedURL[0];
            })
          );
          const description = post.description;
          const post_id = post.post_id;

          const postHashtagIDs = (await pool.query(getPostHashtags, [post_id]))
            .rows;
          const postHashtags = [];
          for (const postHashtag of postHashtagIDs) {
            const tag = (await pool.query(getTagByID, [postHashtag.tag_id]))
              .rows[0].tag_name;
            postHashtags.push(tag);
          }

          const totalPostLikes = (await pool.query(getPostLikes, [post_id]))
            .rows.length;

          return {
            username,
            profilePictureURL,
            date_posted,
            mediaFileURLs,
            description,
            post_id,
            postHashtags,
            totalPostLikes,
          };
        }
      );
      const formattedContent = await Promise.all(formattedContentPromises);
      for (const content of formattedContent) {
        formattedContentArray.push(content);
      }
    }

    res.json(formattedContentArray);
  } catch (err) {
    res.status(500).json(err);
  }
};

export default getContent;

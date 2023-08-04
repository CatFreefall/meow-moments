import { Request, Response } from "express";

import pool from "../../db";
import { getEntryByUsername } from "../../queries/generalQueries";
import { getPostsByUserID } from "../../queries/contentQueries";
import { meowMomentsBucket } from "../../utils/bucketUtils";

const getProfile = async (req: Request, res: Response) => {
  try {
    const { username } = req.params;
    const userEntry = (await pool.query(getEntryByUsername, [username]))
      .rows[0];
    const accountCreationDate = userEntry.account_creation_date;
    const lastPosted = userEntry.last_posted;
    const biography = userEntry.biography;
    const accountStatus = userEntry.is_verified;

    const profilePicturePath = await meowMomentsBucket.getFiles({
      prefix: `${username}/profile/profile-picture.webp`,
    });
    const profilePictureURL = await profilePicturePath[0][0].getSignedUrl({
      action: "read",
      expires: Date.now() + 1000 * 60 * 30,
    });

    res.status(200).send({
      account_creation_date: accountCreationDate,
      last_posted_date: lastPosted,
      biography: biography,
      account_status: accountStatus,
      profile_picture: profilePictureURL[0],
    });
  } catch (err) {
    res
      .status(500)
      .send({ message: "Error. Profile of specified user does not exist." });
  }
};

const getUserPosts = async (req: Request, res: Response) => {
  try {
    const { username } = req.params;
    const userId = (await pool.query(getEntryByUsername, [username])).rows[0]
      .id;
    const userPosts = await pool.query(getPostsByUserID, [userId]);

    const formattedUserPosts = userPosts.rows.map(async (post) => {
      const date_posted = post.date_posted;

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

      return { date_posted, mediaFileURLs, description, post_id };
    });
    const formattedPosts = await Promise.all(formattedUserPosts);

    res.json(formattedPosts);
  } catch (err) {
    res.status(500).send([{ post_id: null }]);
  }
};

export { getProfile, getUserPosts };

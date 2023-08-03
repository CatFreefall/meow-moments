import { Request, Response } from "express";

import pool from "../../db";
import { getEntryByUsername } from "../../queries/generalQueries";
import { meowMomentsBucket } from "../../utils/bucketUtils";

const getProfile = async (req: Request, res: Response) => {
  const { username } = req.params;

  try {
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

export default getProfile;

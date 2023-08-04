import { Request, Response } from "express";

import formatImage from "../../utils/formatImage";
import { meowMomentsBucket } from "../../utils/bucketUtils";
import { changeBiography } from "../../queries/otherQueries";
import pool from "../../db";

const changeProfilePicture = async (req: Request, res: Response) => {
  const { user } = req.cookies;
  const newProfilePicture = req.file;
  const newBiography = req.body.newBio;

  // changing the profile picture in the bucket
  const filePath = `${user}/profile/profile-picture.webp`;
  const webpBuffer = await formatImage(
    newProfilePicture as Express.Multer.File
  );

  const blob = meowMomentsBucket.file(filePath);
  const blobStream = blob.createWriteStream();
  blobStream.end(webpBuffer);

  // changing the user biography in the database.
  await pool.query(changeBiography, [newBiography, user]);

  res.send("success");
};

export { changeProfilePicture };

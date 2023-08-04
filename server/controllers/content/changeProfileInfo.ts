import { Request, Response } from "express";

import formatImage from "../../utils/formatImage";
import { meowMomentsBucket } from "../../utils/bucketUtils";

const changeProfilePicture = async (req: Request, res: Response) => {
  const { user } = req.cookies;
  const newProfilePicture = req.file;

  const filePath = `${user}/profile/profile-picture.webp`;
  const webpBuffer = await formatImage(
    newProfilePicture as Express.Multer.File
  );

  const blob = meowMomentsBucket.file(filePath);
  const blobStream = blob.createWriteStream();
  blobStream.end(webpBuffer);

  console.log(newProfilePicture);
  res.send("changeProfilePicture");
};

export { changeProfilePicture };

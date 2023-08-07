import { meowMomentsBucket } from "../../utils/bucket";
import formatImage from "../../utils/formatImage";
import generateUUID from "../../utils/generateUUID";
import pool from "../../db";
import {
  post,
  getTag,
  addTag,
  addPostHashtags,
  updateLastPosted,
  getPost,
  removePost,
} from "../../queries/postsQueries";
import { getEntryByUsername } from "../../queries/generalQueries";
import formatHashtags from "../../utils/formatHashtags";

const addPost = async (req: any, res: any) => {
  try {
    if (req.files.length > 0) {
      const fileArray: Array<Express.Multer.File> = req.files;
      const { user } = req.cookies;

      // generating a post ID for the user's post. this will be used create a folder
      // containing all image/video files the user uploaded for the post. this will
      // also be saved in the db to reference the post when needed.
      const postID = generateUUID();
      const userID = (await pool.query(getEntryByUsername, [user])).rows[0].id;
      const postDescription = req.body.description;
      const postType = req.params.postType;
      await pool.query(post, [
        postID,
        userID,
        postType,
        `${user}/${postType}/post-${postID}/`,
        postDescription,
      ]);

      // adding the posts hashtags to db. I check if the tag already exists
      // before adding it to prevent a duplicate key error. then, I use the
      // post and tag IDs to create a new entry in the post_tags table.
      const hashtags = formatHashtags(req.body.hashtags);
      hashtags.map(async (hashtag) => {
        const tag = await pool.query(getTag, [hashtag]);
        if (tag.rows.length === 0) {
          const tagID = generateUUID();
          await pool.query(addTag, [tagID, hashtag]);
          await pool.query(addPostHashtags, [postID, tagID]);
        } else {
          await pool.query(addPostHashtags, [postID, tag.rows[0].tag_id]);
        }
      });

      // uploading all files given by the uer to the bucket one at a time
      for (const file in fileArray) {
        // creating the path the file will be stored in in the bucket (with the file included)

        const filePath = `${user}/${postType}/post-${postID}/${req.files[file].originalname}.webp`;

        // formatting the image to webp and changing aspect ratio
        // for consistency, slower file sizes, and faster loading on the client
        const webpBuffer = await formatImage(fileArray[file]);

        const blob = meowMomentsBucket.file(filePath);
        const blobStream = blob.createWriteStream();
        blobStream.end(webpBuffer);
      }

      // updating the user's last_posted date in the database
      await pool.query(updateLastPosted, [new Date(), userID]);

      res.status(200).json("file uploading complete");
    } else {
      res.status(400).json("file not provided");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

const deletePost = async (req: any, res: any) => {
  const { postId } = req.params;
  const { user } = req.cookies;

  const postType = (await pool.query(getPost, [postId])).rows[0].post_type;
  await pool.query(removePost, [postId]);

  const filePath = `${user}/${postType}/post-${postId}/`;
  meowMomentsBucket.deleteFiles({
    prefix: filePath,
  });

  res.send("success");
};

export { addPost, deletePost };

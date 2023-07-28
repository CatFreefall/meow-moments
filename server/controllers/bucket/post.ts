import { meowMomentsBucket } from "../../utils/bucketUtils";
import generatePostID from "../../utils/generatePostID";

const post = async (req: any, res: any) => {
  try {
    if (req.files.length > 0) {
      const fileArray: Array<File> = req.files;

      // generating a post ID for the user's post. this will be used create a folder
      // containing all image/video files the user uploaded for the post. this will later
      // also be saved in the db to manipulate the post.
      const postID = generatePostID();

      // TODO: when a user registers an account, create a directory named
      // after their username in the bucket. The folder should contain 3
      // subdirectories: "illustrations", "videos", and "photos".

      // uploading all files given by the uer to the bucket one at a time
      for (let fileIndex = 0; fileIndex < fileArray.length; fileIndex++) {
        // creating the path the file will be stored in in the bucket (including the file name)
        const { user } = req.cookies;
        const fileDestination = `${user}/${req.params.postType}/post-${postID}/${req.files[fileIndex].originalname}`;

        const blob = meowMomentsBucket.file(fileDestination);
        const blobStream = blob.createWriteStream();
        blobStream
          .on("finish", () => {
            console.log("file uploaded successfully");
          })
          .on("error", (error) => {
            console.log(error);
          })
          .end(req.files[fileIndex].buffer);
      }
      res.status(200).json("file uploading complete");
    } else {
      res.status(400).json("file not provided");
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export { post };

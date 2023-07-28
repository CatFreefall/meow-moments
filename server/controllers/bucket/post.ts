import { meowMomentsBucket } from "../../utils/bucketUtils";

const post = async (req: any, res: any) => {
  try {
    if (req.files.length > 0) {
      const fileArray: Array<File> = req.files;

      // uploading all files given by the uer to the bucket one at a time
      for (let fileIndex = 0; fileIndex < fileArray.length; fileIndex++) {
        // creating the path the file will be stored in in the bucket (with the file name)
        const fileDestination = `${req.params.postType}/${req.files[fileIndex].originalname}`;

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

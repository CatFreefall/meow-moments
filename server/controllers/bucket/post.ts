import { meowMomentsBucket } from "../../utils/bucketUtils";

const post = async (req: any, res: any) => {
  try {
    if (req.files.length > 0) {
      const fileArray: Array<File> = req.files;
      const blobArray: Array<any> = [];

      // uploading all files given by the uer to the bucket one at a time
      for (let fileIndex = 0; fileIndex < fileArray.length; fileIndex++) {
        const blob = meowMomentsBucket.file(req.files[fileIndex].originalname);
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
      res.status(200).json("file(s) uploaded to bucket");
    } else {
      res.status(400).json({ message: "file not provided" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

export { post };

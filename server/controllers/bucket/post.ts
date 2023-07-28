import { meowMomentsBucket } from "../../utils/bucketUtils";

const post = async (req: any, res: any) => {
  try {
    if (req.files.length > 0) {
      const fileArray = req.files;

      await fileArray.map((file: File) => {
        const blob = meowMomentsBucket.file(req.files[0].originalname);
        const blobStream = blob.createWriteStream();
        blobStream
          .on("finish", () => {
            console.log("file uploaded successfully");
          })
          .on("error", (error) => {
            console.log(error);
          })
          .end(req.files[0].buffer);
      });
      res.status(200).json("file(s) uploaded to bucket");
    } else {
      res.status(400).json({ message: "file not provided" });
    }
  } catch (error) {
    res.status(500).json(error + "ok");
  }
};

export { post };

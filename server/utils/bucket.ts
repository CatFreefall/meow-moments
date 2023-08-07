import { Storage } from "@google-cloud/storage";

const googleCloudStorage = new Storage({
  keyFilename: "./meow-moments-de09bd24e7e8.json",
  projectId: "meow-moments",
});
const meowMomentsBucket = googleCloudStorage.bucket("meow-moments-bucket");

export { meowMomentsBucket };

import { v4 } from "uuid";

const generatePostID = (): string => {
  const newFileName = v4();
  return newFileName;
};

export default generatePostID;

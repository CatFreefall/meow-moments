import { v4 } from "uuid";

const generateUUID = (): string => {
  const newFileName = v4();
  return newFileName;
};

export default generateUUID;

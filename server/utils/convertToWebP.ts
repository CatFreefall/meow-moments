import sharp from "sharp";

const convertToWebP = async (input: Express.Multer.File) => {

  try {
    const webPBuffer = await sharp(input.buffer).webp({quality: 40}).toBuffer();
    return webPBuffer;
  } catch (err) {
    console.log(err);
  }
};

export default convertToWebP;

import sharp from "sharp";

const formatImage = async (input: Express.Multer.File) => {
  try {
    // formatting to webp and making image widths consistent while
    // maintaining aspect ratio to keep image file sizes not too
    // big while maintaining significant quality
    const { width, height } = await sharp(input.buffer).metadata();
    const desiredWidth = 800;
    const desiredHeight = Math.round(
      (desiredWidth / (width || 0)) * (height || 0)
    );

    const webPBuffer = await sharp(input.buffer)
      .toFormat("webp")
      .resize(desiredWidth, desiredHeight)
      .toBuffer();

    return webPBuffer;
  } catch (err) {
    console.log(err);
  }
};

export default formatImage;

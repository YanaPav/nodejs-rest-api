const { HttpError } = require("../helpers");
const Jimp = require("jimp");

const prepareAvatar = async (req, res, next) => {
  if (!req.file) {
    next(HttpError(400, "No image"));
  }

  try {
    const { path: tempDir } = req.file;
    const image = await Jimp.read(tempDir);
    await image.resize(250, 250).write(tempDir);
  } catch (error) {
    next(error);
  }

  next();
};

module.exports = prepareAvatar;

const { HttpError } = require("../helpers");
const Jimp = require("jimp");

const prepareAvatar = (req, res, next) => {
  if (!req.file) {
    next(HttpError(400, "No image"));
  }

  const { path: tempDir } = req.file;

  Jimp.read(tempDir)
    .then((image) => {
      return image.resize(250, 250).write(tempDir);
    })
    .catch((err) => {
      next(err);
    });

  next();
};

module.exports = prepareAvatar;

const User = require("../../services/users/schema");
const fs = require("fs/promises");
const patch = require("path");

const avatarsDir = patch.join(__dirname, "../../", "public", "avatars");

const avatarUpdate = async (req, res, next) => {
  const userId = req.userId;
  const { path: tempDir, originalname } = req.file;

  // image name was changed by multer while uploading to temp dir
  const imgName = `${userId}_${originalname}`;

  const resultDir = patch.join(avatarsDir, imgName);
  await fs.rename(tempDir, resultDir);

  const avatarUrl = patch.join("avatars", imgName);
  await User.findByIdAndUpdate(userId, { avatarUrl });

  res.json({
    avatarUrl,
  });
};

module.exports = avatarUpdate;

const isValidId = require("./isValidId");
const validateBody = require("./validateBody");
const authMiddleware = require("./auth/authMiddleware");
const upload = require("./upload");
const prepareAvatar = require("./prepareAvatar");

module.exports = {
  isValidId,
  validateBody,
  authMiddleware,
  upload,
  prepareAvatar,
};

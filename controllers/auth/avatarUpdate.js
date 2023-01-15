const auth = require("../../services/users/index");

const avatarUpdate = async (req, res, next) => {
  const { userId, file } = req;
  const avatarUrl = await auth.avatarUpdate(userId, file);

  res.json({
    avatarUrl,
  });
};

module.exports = avatarUpdate;

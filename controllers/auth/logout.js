const auth = require("../../services/users/index");

const logout = async (req, res, next) => {
  const { userId, token } = req;
  await auth.logout(userId, token);

  res.status(204).json();
};

module.exports = logout;

const auth = require("../../services/users/index");

const current = async (req, res, next) => {
  const { email, subscription } = await auth.current(req.userId);
  res.json({ email, subscription });
};

module.exports = current;

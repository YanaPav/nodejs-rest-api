const auth = require("../../services/users/index");

const login = async (req, res, next) => {
  const { email, password } = req.body;

  const { token, subscription, avatarURL } = await auth.login(email, password);

  res.json({
    token,
    user: {
      email,
      subscription,
      avatarURL,
    },
  });
};

module.exports = login;

const auth = require("../../services/users/index");

const register = async (req, res, next) => {
  const { email, password } = req.body;
  await auth.register(email, password);

  res.status(201).json({
    user: {
      email,
      subscription: "starter",
    },
  });
};

module.exports = register;

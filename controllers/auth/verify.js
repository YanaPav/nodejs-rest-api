const auth = require("../../services/users/index");

const verify = async (req, res, next) => {
  const { verificationToken } = req.params;

  await auth.verify(verificationToken);

  res.json({
    message: "Verification successful",
  });
};

module.exports = verify;

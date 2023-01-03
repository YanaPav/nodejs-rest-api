const { HttpError } = require("../../helpers");
const jwt = require("jsonwebtoken");
const User = require("../../services/users/schema");

const authMiddleware = async (req, res, next) => {
  const { authorization = "" } = req.headers;
  const [tokenType, token] = authorization.split(" ");

  if (!token) {
    next(HttpError(401, "Not authorized"));
  }

  try {
    const hashedUser = jwt.decode(token, process.env.JWT_SECRET);
    const user = await User.findById(hashedUser._id);

    if (!user || user?.token !== token) {
      next(HttpError(401, "Not authorized"));
    }

    req.token = token;
    req.userId = user._id;
    next();
  } catch (error) {
    next(HttpError(401, "Not authorized"));
  }
};

module.exports = authMiddleware;

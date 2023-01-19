const User = require("./schema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { HttpError, sendEmail } = require("../../helpers");
const gravatar = require("gravatar");
const fs = require("fs/promises");
const patch = require("path");

const { nanoid } = require("nanoid");

const register = async (email, password) => {
  const user = await User.findOne({ email });

  if (user) {
    throw HttpError(409, "Email in use");
  }

  const newUser = new User({
    email,
    password: await bcrypt.hash(password, 10),
    avatarURL: gravatar.url(email),
    verificationToken: nanoid(),
  });
  await newUser.save();

  const msg = {
    to: email,
    subject: "Verify your email",
    html: `<p>Click <a href=http://localhost:3000/api/users/verify/${newUser.verificationToken}>here</a> to confirm email</p>`,
  };

  await sendEmail(msg);
};

const verify = async (verificationToken) => {
  const user = await User.findOne({ verificationToken });

  if (!user) {
    throw HttpError(404, "User not found");
  }

  await User.findByIdAndUpdate(user._id, {
    verify: true,
    verificationToken: "",
  });
};

const resendVerify = async (email) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(404, "User not found");
  }

  if (user.verificationToken === "") {
    throw HttpError(400, "Verification has already been passed");
  }

  const msg = {
    to: email,
    subject: "Verify your email",
    html: `<p>Click <a href=http://localhost:3000/api/users/verify/${user.verificationToken}>here</a> to confirm email</p>`,
  };

  await sendEmail(msg);
};

const login = async (email, password) => {
  const user = await User.findOne({ email });

  if (!user) {
    throw HttpError(401, "Email or password is wrong");
  }

  if (!user.verify) {
    throw HttpError(401, "Unconfirmed email");
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);

  if (!isPasswordCorrect) {
    throw HttpError(401, "Email or password is wrong");
  }

  const token = jwt.sign(
    {
      _id: user._id,
      email: user.email,
    },
    process.env.JWT_SECRET
  );

  await User.findByIdAndUpdate(user._id, { $set: { token } });

  return {
    token,
    subscription: user.subscription,
    avatarURL: user.avatarURL,
  };
};

const logout = async (userId, token) => {
  const user = await User.findByIdAndUpdate(userId, { $unset: { token } });
  console.log(user);

  if (!user) {
    throw HttpError(401, "Not authorized");
  }
};

const current = async (userId) => {
  const user = await User.findById(userId);

  if (!user) {
    throw HttpError(401, "Not authorized");
  }

  return user;
};

const avatarUpdate = async (userId, file) => {
  const avatarsDir = patch.join(__dirname, "../../", "public", "avatars");
  const { path: tempDir, originalname } = file;
  const imgName = `${userId}_${originalname}`;
  const resultDir = patch.join(avatarsDir, imgName);

  await fs.rename(tempDir, resultDir);

  const avatarUrl = patch.join("avatars", imgName);
  await User.findByIdAndUpdate(userId, { avatarUrl });

  return avatarUrl;
};

module.exports = {
  register,
  login,
  logout,
  current,
  avatarUpdate,
  verify,
  resendVerify,
};

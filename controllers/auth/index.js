const login = require("./login");
const register = require("./register");
const logout = require("./logout");
const current = require("./current");
const avatarUpdate = require("./avatarUpdate");
const verify = require("./verify");
const resendVerify = require("./resendVerify");

module.exports = {
  login,
  register,
  logout,
  current,
  avatarUpdate,
  verify,
  resendVerify,
};

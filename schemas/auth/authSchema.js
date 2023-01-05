const Joi = require("joi");

const emailRegExp =
  /^([a-z0-9_-]+.)*[a-z0-9_-]+@[a-z0-9_-]+(.[a-z0-9_-]+)*.[a-z]{2,6}$/;

const authSchema = Joi.object({
  email: Joi.string().required().pattern(emailRegExp),
  password: Joi.string().required(),
});

module.exports = authSchema;

const contacts = require("../../services/contacts");

const add = async (req, res, next) => {
  const { body, userId } = req;
  const result = await contacts.addContact(body, userId);
  res.status(201).json(result);
};

module.exports = add;

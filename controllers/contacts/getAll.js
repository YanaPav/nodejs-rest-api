const contacts = require("../../services/contacts");

const getAll = async (req, res, next) => {
  const result = await contacts.listContacts(req.userId);
  res.json(result);
};

module.exports = getAll;

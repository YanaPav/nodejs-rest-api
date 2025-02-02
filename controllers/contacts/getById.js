const contacts = require("../../services/contacts");
const { HttpError } = require("../../helpers");

const getById = async (req, res, next) => {
  const { contactId } = req.params;
  const result = await contacts.getContactById(contactId, req.userId);

  if (!result) {
    throw HttpError(404, "Not found");
  }

  res.json(result);
};

module.exports = getById;

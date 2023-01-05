const contacts = require("../../services/contacts");

const statusUpdate = async (req, res, next) => {
  const { contactId } = req.params;
  const { body, userId } = req;
  const result = await contacts.updateStatusContact(contactId, body, userId);

  if (!result) {
    return res.status(404).json({ message: "Not found" });
  }

  res.json(result);
};

module.exports = statusUpdate;

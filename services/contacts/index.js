const Contact = require("./schema");

const listContacts = async (ownerId) => {
  const data = await Contact.find({ owner: ownerId });
  return data;
};

const getContactById = async (contactId, ownerId) => {
  const result = await Contact.findOne({ _id: contactId, owner: ownerId });
  return result || null;
};

const removeContact = async (contactId, ownerId) => {
  const result = await Contact.findOneAndDelete({
    _id: contactId,
    owner: ownerId,
  });
  return result;
};

const addContact = async (body, ownerId) => {
  const { name, email, phone } = body;
  const contact = new Contact({
    name,
    email,
    phone,
    owner: ownerId,
  });

  const result = contact.save();
  return result;
};

const updateContact = async (contactId, body, ownerId) => {
  const updatedContact = await Contact.findOneAndUpdate(
    { _id: contactId, owner: ownerId },
    { $set: body },
    { new: true }
  );
  return updatedContact;
};

const updateStatusContact = async (contactId, body, ownerId) => {
  const updatedContact = await Contact.findOneAndUpdate(
    { _id: contactId, owner: ownerId },
    { $set: body },
    { new: true }
  );
  return updatedContact;
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
  updateContact,
  updateStatusContact,
};

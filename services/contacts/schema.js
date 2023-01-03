const mongoose = require("mongoose");
const { Schema, SchemaTypes } = mongoose;
const { handleMongooseError } = require("../../helpers");

const contact = new Schema({
  name: {
    type: String,
    required: [true, "Set name for contact"],
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
  favorite: {
    type: Boolean,
    default: false,
  },
  owner: {
    type: SchemaTypes.ObjectId,
    ref: "user",
  },
});

contact.post("save", handleMongooseError);

const Contact = mongoose.model("contact", contact);

module.exports = Contact;

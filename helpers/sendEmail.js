const sgMail = require("@sendgrid/mail");
require("dotenv").config();

const { SENDGRID_API_KEY } = process.env;
sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (data) => {
  const email = { ...data, from: "yanapavlik@ukr.net" };

  try {
    await sgMail.send(email);
    console.log("Email sent");
    return true;
  } catch (error) {
    console.error(error);
  }
};

module.exports = sendEmail;

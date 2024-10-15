const validator = require("validator");

const validateSignUpData = (req) => {
  const { emailId, password, firstName } = req.body;

  if (!firstName) {
    throw new Error("first name required");
  }
  if (firstName.length < 2) {
    throw new Error("invalid first name");
  }
  if (!validator.isEmail(emailId)) {
    throw new Error("invlid email id");
  }
  if (!validator.isStrongPassword(password)) {
    throw new Error("strong password required");
  }
};

module.exports = {
  validateSignUpData,
};

const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateAtRegisterInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.email = !isEmpty(data.email) ? data.email : "";
  data.password = !isEmpty(data.password) ? data.password : "";
  data.password2 = !isEmpty(data.password2) ? data.password2 : "";
  data.phone_no = !isEmpty(data.phone_no) ? data.phone_no : "";

  if (!Validator.isLength(data.name, { min: 2, max: 30 })) {
    errors.name = "Company name must be between 2 and 30 characters";
  }

  if (Validator.isEmpty(data.name)) {
    errors.name = "Company name field is required";
  }

  if (Validator.isEmpty(data.email)) {
    errors.email = "Company email field is required";
  }

  if (!Validator.isEmail(data.email)) {
    errors.email = "Company email is invalid";
  }

  if (Validator.isEmpty(data.password)) {
    errors.password = "Password field is required";
  }

  if (!Validator.isLength(data.password, { min: 6, max: 30 })) {
    errors.password = "Password must be at least 6 characters";
  }

  if (Validator.isEmpty(data.password2)) {
    errors.password2 = "Confirm Password field is required";
  }

  if (!Validator.equals(data.password, data.password2)) {
    errors.password2 = "Passwords must match";
  }
  if (Validator.isEmpty(data.phone_no)) {
    errors.phone_no = "Phone number is required";
  }
  return {
    errors,
    isValid: isEmpty(errors)
  };
};

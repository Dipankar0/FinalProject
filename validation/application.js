const Validator = require("validator");
const isEmpty = require("./is-empty");

module.exports = function validateApplicationInput(data) {
  let errors = {};

  data.name = !isEmpty(data.name) ? data.name : "";
  data.description = !isEmpty(data.description) ? data.description : "";
  data.typeOfPacket = !isEmpty(data.typeOfPacket) ? data.typeOfPacket : "";

  if (Validator.isEmpty(data.name)) {
    errors.name = "Company name field is required";
  }
  if (Validator.isEmpty(data.description)) {
    errors.description = "Company description field is required";
  }
  if (Validator.isEmpty(data.typeOfPacket)) {
    errors.typeOfPacket = "This field is required";
  }
  
  return {
    errors,
    isValid: isEmpty(errors)
  };
};

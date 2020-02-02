const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const AtUserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  phone_no: {
    type: String,
    required: true
  },
  code:{
    type: String,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

module.exports = AtUser = mongoose.model("atUsers", AtUserSchema);

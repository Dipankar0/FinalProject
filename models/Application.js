const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ApplicationSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'users'
  },
  atUser:{
   type: String
  },
  name: {
    type: String,
    required: true
  },
  companyName: {
    type: String
  },
  companyAdd : {
    type: String
  },
  description: {
    type: String,
    required: true
  },
  typeOfPacket: {
    type: String,
    required: true
  },
  nameOfIngre : {
    type: String
  },
  ingreCompany: {
    type: String
  },
  ingreCompanyAdd: {
    type: String
  },
  ingreCert: {
    type: String
  },
  veteCertificate: {
    type: String
  },
  finanStatement: {
    type: String
  },
  citizenId: {
    type: String
  },
  citizenLetter: {
    type: String
  },
  applicationStatus: {
    type: String
  },
  appliedDate: {
    type: Date,
    default: Date.now
  },
}
);

module.exports = Application = mongoose.model("application", ApplicationSchema);

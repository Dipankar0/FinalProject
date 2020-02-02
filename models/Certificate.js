const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CertificateSchema = new Schema ({
    applicationId: {
        type: Schema.Types.ObjectId,
        ref: 'application'
    },
    companyName: {
        type: String
    },
    companyAdd: {
        type: String
    },
    productName: {
        type: String
    },
    authorityName: {
        type: String
    },
    description: {
        type: String,
    },
    startDate: {
        type: Date,
        default: Date.now
    },
    rejectionReason: {
        type: String  
    },
    rejection: {
        type: String
    },
    expireDate: {
        type: Date
    }
});

module.exports = Certificate = mongoose.model("certificate", CertificateSchema);
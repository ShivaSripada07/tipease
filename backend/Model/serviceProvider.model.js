const mongoose = require('mongoose');

const serverProviderSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    mobileNumber: {
        type: Number,
        required: true,
        unique: true
    },
    serviceId: {
        type: Number,
        required: true,
        unique: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    bankDetails: {
        type: String,
        required: true,
        unique: true
    },
    role: {
        type: String,
        required: true
    },
    organisationId: {
        type: Number,
        required: true
    },
    qrCode: {
        type: String,
        required: true
    }
});

const serviceProviderModel = mongoose.model("serviceprovider", serverProviderSchema);
module.exports = serviceProviderModel;
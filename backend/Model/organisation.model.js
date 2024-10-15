const mongoose = require('mongoose');

const organisationSchema = mongoose.Schema({
    email:
    {
        type : String,
        required : true,
        unique : true
    },
    password :
    {
        type : String,
        required : true
    },
    role :
    {
        type : String , 
        required : true
    },
    organisationId :
    {
        type : Number,
        required : true,
        unique : true
    },
    organisationName : 
    {
        type : String , 
        required : true,
        unique : true
    },
    location :
    {
        type : String,
        required : true
    },
    mobileNumber :
    {
        type : Number,
        required : true
    },
    imageUrl : 
    {
        type : String,
        required : true
    }
});
const organisationModel = mongoose.model("organisation",organisationSchema);

module.exports = organisationModel ;
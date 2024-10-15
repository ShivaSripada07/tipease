const { timeStamp } = require('console');
const mongoose = require('mongoose');
const { emitWarning } = require('process');
const userSchema = mongoose.Schema({

    email :
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
    mobileNumber :
    {
        type : Number,
        required : true,
        unique : true
    },    
    imageUrl : 
    {
        type : String,
        required : true
    },
    role :
    {
        type : String , 
        required : true
    },
    username :{
        type : String,
        required : true,
        unique : true
    }
},
{
    timeStamp:true
});
const userModel = mongoose.model("user",userSchema);
module.exports = userModel;
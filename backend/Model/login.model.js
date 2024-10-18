const mongoose = require('mongoose');

const longinSchema = mongoose.Schema({

    email:
    {
        type : String,
        required : true,
        unique : true
    },
    password : 
    {
        type : String,
        required : true,
        unique : true
    },
    role :
    {
        type : String,
        required : true
    },
    name:
    {
        type:String,
        required:true
    }
});
const loginModel = mongoose.model("login",longinSchema);

module.exports = loginModel;

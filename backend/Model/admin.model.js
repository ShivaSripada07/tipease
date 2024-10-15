/*
1.import mongoose
2.create scheme by using mongoose.Scheme({});
3.create model by using mongoose.model("name",schema); name will be saved in plural form
4.export for use
*/
const mongoose = require('mongoose');
const adminSchema = mongoose.Schema({
    email:
    {
        type:String,
        required : true,
        unique : true
    },
    password :
    {
        type:String,
        required : true
    },
    role :
    {
        type : String , 
        required : true ,
        default : "admin"
    }
});

const adminModel = mongoose.model("admin",adminSchema);
module.exports = adminModel;
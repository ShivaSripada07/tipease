//express 
const express = require('express');
const app = express();

//path routes for roles
const adminRoute = require('./Route/admin.route');
const organisaionRoute = require('./Route/organisation.route');
const serviceProviderRoute = require('./Route/serviceProvider.route');
const userRoute = require('./Route/user.route');
const loginRoute = require('./Route/login.route');

const {checkUser} = require('./Middleware/checkUser.controller');
const {verifyToken,isAdmin} = require('./Middleware/authentication');

//environment variables
require("dotenv").config();
const PORT  = process.env.PORT;


//database connection 
const {connectMongoDB} = require('./Connection/connection.db');
const url = "mongodb+srv://shivasripada04:tipease@tipease.pzlei.mongodb.net/tipease";
connectMongoDB(url);


//app middlewares
app.use(express.json());
app.use(express.urlencoded({extended:false}));
//log file (info about all requests and response)
const {logReq} = require('./LOG/log');
app.use(logReq('/Users/shivasripada/Desktop/minor/tipease/backend/LOG/logFile.txt'));


//routes
app.use('/admin',verifyToken,isAdmin,adminRoute);
app.use('/organisation',verifyToken,organisaionRoute);
app.use('/serviceProvider',verifyToken,serviceProviderRoute);
app.use('/user',verifyToken,userRoute);
app.use('/login',loginRoute);

//app port connection
app.listen(PORT,(err)=>
{
    if(err)
    {
        console.log("error occurred",err);
    }
    else
    {
        console.log(`server listening at port : ${PORT}`);
    }
});


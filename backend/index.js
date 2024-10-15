//express 
const express = require('express');
const app = express();

//path routes for roles
const adminRoute = require('./Route/admin.route');
const organisaionRoute = require('./Route/organisation.route');
const serviceProviderRoute = require('./Route/serviceProvider.route');
const userRoute = require('./Route/user.route');

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
app.use(logReq('/Users/shivasripada/Desktop/tipease/backend/LOG/logFile.txt'));


//routes
app.use('/admin',adminRoute);
app.use('/organisation',organisaionRoute);
app.use('/serviceProvider',serviceProviderRoute);
app.use('/user',userRoute);


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


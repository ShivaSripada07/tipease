const express = require('express');
const routes = express.Router();
const {generateOTP} = require('../Controllers/otp.controller');
routes.post('/',generateOTP);


module.exports=routes;
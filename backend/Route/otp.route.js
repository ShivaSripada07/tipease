const express = require('express');
const routes = express.Router();
const {generateOTP} = require('../Controllers/otp.controller');
routes.get('/',generateOTP);


module.exports=routes;
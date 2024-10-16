const express = require('express');
const router = express.Router();
const {checkUser} = require('../Middleware/checkUser.controller');
router.post('/',checkUser);
module.exports = router;
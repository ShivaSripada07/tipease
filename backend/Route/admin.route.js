const express = require('express');
const routes = express.Router();
const {getAdmin,saveAdmin,updateAdmin,deleteAdmin} = require('../Controllers/admin.controller');
const {verifyToken} = require('../Middleware/authentication');


routes.get('/',verifyToken,getAdmin);
routes.post('/addAdmin',saveAdmin);
routes.patch('/updateAdmin',verifyToken,updateAdmin);
routes.delete('/deleteAdmin',verifyToken,deleteAdmin);

module.exports = routes ;
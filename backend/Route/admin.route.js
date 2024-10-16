const express = require('express');
const routes = express.Router();
const {getAdmin,saveAdmin,updateAdmin,deleteAdmin} = require('../Controllers/admin.controller');

routes.get('/',getAdmin);
routes.post('/addAdmin',saveAdmin);
routes.patch('/updateAdmin',updateAdmin);
routes.delete('/deleteAdmin',deleteAdmin);

module.exports = routes ;
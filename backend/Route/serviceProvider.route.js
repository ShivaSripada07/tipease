const express = require('express');
const routes = express.Router();
const {getServiceProvider,saveServiceProvider,updateServiceProvider,deleteServiceProvider} = require('../Controllers/serviceProvider.controller');

routes.get('/',getServiceProvider);
routes.post('/addUser',saveServiceProvider);
routes.patch('/editUser/:id',updateServiceProvider);
routes.delete('/deleteUser/:id',deleteServiceProvider);

module.exports = routes ;
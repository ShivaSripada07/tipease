const express = require('express');
const routes = express.Router();
const {getServiceProvider,saveServiceProvider,updateServiceProvider,deleteServiceProvider} = require('../Controllers/serviceProvider.controller');

routes.get('/',getServiceProvider);
routes.post('/add',saveServiceProvider);
routes.patch('/edit',updateServiceProvider);
routes.delete('/delete',deleteServiceProvider);

module.exports = routes ;
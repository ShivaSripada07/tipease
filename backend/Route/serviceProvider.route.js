const express = require('express');
const routes = express.Router();
const {getServiceProvider,saveServiceProvider,updateServiceProvider,deleteServiceProvider,getBySearch} = require('../Controllers/serviceProvider.controller');

routes.get('/',getServiceProvider);
routes.get('/search',getBySearch);
routes.post('/add',saveServiceProvider);
routes.patch('/edit',updateServiceProvider);
routes.delete('/delete',deleteServiceProvider);

module.exports = routes ;
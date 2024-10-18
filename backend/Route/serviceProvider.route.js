const express = require('express');
const routes = express.Router();
const {getServiceProvider,saveServiceProvider,updateServiceProvider,deleteServiceProvider,getBySearch} = require('../Controllers/serviceProvider.controller');
const {verifyToken} = require('../Middleware/authentication');


routes.get('/',verifyToken,getServiceProvider);
routes.get('/search',verifyToken,getBySearch);
routes.post('/add',saveServiceProvider);
routes.patch('/edit',verifyToken,updateServiceProvider);
routes.delete('/delete',verifyToken,deleteServiceProvider);

module.exports = routes ;
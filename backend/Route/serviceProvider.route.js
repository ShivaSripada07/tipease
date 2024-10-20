const express = require('express');
const routes = express.Router();
const {getServiceProvider,saveServiceProvider,updateServiceProvider,deleteServiceProvider,getBySearch,getByOrgId} = require('../Controllers/serviceProvider.controller');
const {verifyToken} = require('../Middleware/authentication');


routes.get('/',getServiceProvider);
routes.get('/search',verifyToken,getBySearch);
routes.post('/add',verifyToken,saveServiceProvider);
routes.patch('/edit',verifyToken,updateServiceProvider);
routes.delete('/delete',verifyToken,deleteServiceProvider);
routes.post('/byOrg',verifyToken,getByOrgId);

module.exports = routes ;
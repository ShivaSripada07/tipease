const express = require('express');
const routes = express.Router();
const {getSPByName,getServiceProvider,saveServiceProvider,updateServiceProvider,deleteServiceProvider,getBySearch,getByOrgId,getSPById} = require('../Controllers/serviceProvider.controller');
const {verifyToken} = require('../Middleware/authentication');

routes.post('/byOrg',getByOrgId);
routes.get('/',getServiceProvider);
routes.get('/search',verifyToken,getBySearch);
routes.post('/add',saveServiceProvider);
routes.patch('/edit',verifyToken,updateServiceProvider);
routes.delete('/delete',verifyToken,deleteServiceProvider);
routes.post('/',getSPById);
routes.post('/byName',getSPByName);


module.exports = routes ;
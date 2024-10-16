const express = require('express');
const routes = express.Router();
const {getOrganisation,saveOrganisation,updateOrganisation,deleteOrganisation,getBySearch} = require('../Controllers/organisation.controller');
const {verifyToken} = require('../Middleware/authentication');



routes.get('/',verifyToken,getOrganisation);
routes.get('/search',verifyToken,getBySearch);
routes.post('/add',saveOrganisation);
routes.patch('/edit',verifyToken,updateOrganisation);
routes.delete('/delete',verifyToken,deleteOrganisation);

module.exports = routes ;
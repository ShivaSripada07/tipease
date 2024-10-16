const express = require('express');
const routes = express.Router();
const {getOrganisation,saveOrganisation,updateOrganisation,deleteOrganisation} = require('../Controllers/organisation.controller');


routes.get('/',getOrganisation);
routes.post('/add',saveOrganisation);
routes.patch('/edit',updateOrganisation);
routes.delete('/delete',deleteOrganisation);

module.exports = routes ;
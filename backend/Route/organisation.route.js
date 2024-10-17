const express = require('express');
const routes = express.Router();
const {getOrganisation,saveOrganisation,updateOrganisation,deleteOrganisation,getBySearch} = require('../Controllers/organisation.controller');



routes.get('/',getOrganisation);
routes.get('/search',getBySearch);
routes.post('/add',saveOrganisation);
routes.patch('/edit',updateOrganisation);
routes.delete('/delete',deleteOrganisation);

module.exports = routes ;
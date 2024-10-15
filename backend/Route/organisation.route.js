const express = require('express');
const routes = express.Router();
const {getOrganisation,saveOrganisation,updateOrganisation,deleteOrganisation} = require('../Controllers/organisation.controller');


routes.get('/',getOrganisation);
routes.post('/addUser',saveOrganisation);
routes.patch('/editUser/:id',updateOrganisation);
routes.delete('/deleteUser/:id',deleteOrganisation);

module.exports = routes ;
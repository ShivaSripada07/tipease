const express = require('express');
const routes = express.Router();

const {getUsers,saveUsers,updateUsers,deleteUsers} = require('../Controllers/user.controller');

routes.get('/',getUsers);
routes.post('/addUser',saveUsers);
routes.patch('/editUser/:id',updateUsers);
routes.delete('/deleteUser/:id',deleteUsers);

module.exports = routes ;
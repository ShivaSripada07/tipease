const express = require('express');
const routes = express.Router();

const {getUsers,saveUsers,updateUsers,deleteUsers,getBySearch} = require('../Controllers/user.controller');

routes.get('/',getUsers);
routes.get('/search',getBySearch);
routes.post('/addUser',saveUsers);
routes.patch('/editUser',updateUsers);
routes.delete('/deleteUser',deleteUsers);

module.exports = routes ;
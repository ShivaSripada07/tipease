const express = require('express');
const routes = express.Router();

const {getUsers,saveUsers,updateUsers,deleteUsers,getBySearch,getByName} = require('../Controllers/user.controller');
const {verifyToken} = require('../Middleware/authentication');



routes.get('/',verifyToken,getUsers);
routes.get('/search',verifyToken,getBySearch);
routes.post('/addUser',saveUsers);
routes.patch('/editUser',updateUsers);
routes.delete('/deleteUser',verifyToken,deleteUsers);
routes.get('/Name',getByName);

module.exports = routes ;
const express = require('express');
const route = express.Router();
const UserController = require('../Controllers').UserController;

route.post('/register', UserController.register)
route.post('/login', UserController.login)
route.post('/googleLogin', UserController.googleLogin)
module.exports = route;
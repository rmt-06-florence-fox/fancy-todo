const express = require ('express');
const userRouter = express.Router();

const UserController = require('../controllers/UserController.js');

userRouter.post('/', UserController.register);
//userRouter.post('/googleLogin', UserController.googleLogin);

module.exports = userRouter;
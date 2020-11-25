const express = require ('express');
const userRouter = express.Router();

const UserController = require('../controllers/UserController.js');

userRouter.post('/', UserController.register);

module.exports = userRouter;
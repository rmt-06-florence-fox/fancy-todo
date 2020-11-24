const express = require ('express');
const router = express.Router();

const Controller = require('../controllers/Controller.js');
const UserController = require('../controllers/UserController.js');

const todoRouter = require('./todoRouter.js');
const userRouter = require('./userRouter.js');

router.get('/', Controller.home);
router.use('/todos', todoRouter);
router.use('/register', userRouter);
router.post('/login', UserController.login);

module.exports = router;
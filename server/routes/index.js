const express = require ('express');
const router = express.Router();

const Controller = require('../controllers/Controller.js');
const UserController = require('../controllers/UserController.js');

const todoRouter = require('./todoRouter.js');

router.get('/', Controller.home);
router.use('/todos', todoRouter);
router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.post('/googleLogin', UserController.googleLogin);

module.exports = router;
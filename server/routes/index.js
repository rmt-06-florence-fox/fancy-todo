const router = require('express').Router();
const TodoRoutes = require('./todo');
const { UserController } = require('../controller');

router.use('/todos', TodoRoutes);

router.post('/register', UserController.register);

router.post('/login', UserController.login);

module.exports = router;

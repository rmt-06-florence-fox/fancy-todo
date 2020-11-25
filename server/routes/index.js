const router = require('express').Router();
const TodoRoutes = require('./todo');
const { UserController } = require('../controller');
const { Controller } = require('../controller');

router.use('/todos', TodoRoutes);

router.post('/register', UserController.register);

router.post('/login', UserController.login);

router.post('/googleLogin', UserController.googleLogin);

router.get('/covidinfo', Controller.summaryCovid);

module.exports = router;

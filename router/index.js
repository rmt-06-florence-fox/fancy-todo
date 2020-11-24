const express = require('express')
const Controller = require('../controllers/todo')
const UserController =  require('../controllers/user')
const routerTodos = require('./todosRouter')
const authentication = require('../middlewares/authentication')
const router = express.Router()

router.post('/register', UserController.register)
router.post('/login', UserController.login)
router.use('/todos', routerTodos )
module.exports = router
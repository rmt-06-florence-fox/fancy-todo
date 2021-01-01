const express = require('express')
const UserController =  require('../controllers/user')
const routerTodos = require('./todosRouter')
const router = express.Router()


router.post('/login', UserController.login)
router.post('/register', UserController.register)
router.post('/googleLogin', UserController.googleLogin)
// router.get('/lyric',Controller.quote)
router.use('/todos', routerTodos )
module.exports = router
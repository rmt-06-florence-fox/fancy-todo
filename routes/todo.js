const router = require('express').Router()
const { TodoController } = require('../controllers')

router.post('/', TodoController.inputTodo)

module.exports = router
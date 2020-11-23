const router = require('express').Router()
const TodoController = require('../controllers/controller')

router.post('/todos', TodoController.createTodos)

module.exports = router
const express = require('express')
const router = express.Router()
const { TodoController } = require('../controllers/index')

router.post('/', TodoController.createTodo)
router.get('/', TodoController.getTodos)
router.get('/:id', TodoController.getTodoById)
router.put('/:id', TodoController.updateTodo)
router.patch('/:id', TodoController.updateStatus)
router.delete('/:id', TodoController.deleteTodo)

module.exports = router
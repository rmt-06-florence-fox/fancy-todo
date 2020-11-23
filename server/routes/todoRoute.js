const express = require('express')
const router = express.Router()

const TodoController = require('../controllers/todoController')

router.get('/', TodoController.findAll)
router.post('/', TodoController.addTodo)
router.get('/:id', TodoController.getTodo)
router.put('/:id', TodoController.changeTodo)
router.patch('/:id', TodoController.editStatus)
router.delete('/:id', TodoController.destroyTodo)

module.exports = router
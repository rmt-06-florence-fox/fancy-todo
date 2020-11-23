const router = require('express').Router()
const { TodoController } = require('../controllers')

router.get('/', TodoController.readTodos)
router.post('/', TodoController.createTodos)
router.get('/:id', TodoController.readTodosById)
router.put('/:id', TodoController.editTodosByRow)
router.patch('/:id', TodoController.editTodosByColumn)
router.delete('/:id', TodoController.deleteTodos)

module.exports = router
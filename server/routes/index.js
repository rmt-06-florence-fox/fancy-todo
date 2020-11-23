const router = require('express').Router()
const { TodoController } = require('../controllers')

router.get('/todos', TodoController.readTodos)
router.post('/todos', TodoController.createTodos)
router.get('/todos/:id', TodoController.readTodosById)
router.put('/todos/:id', TodoController.editTodosByRow)
router.patch('/todos/:id', TodoController.editTodosByColumn)
router.delete('/todos/:id', TodoController.deleteTodos)

module.exports = router
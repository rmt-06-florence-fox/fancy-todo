const route = require('express').Router()
const { TodoController } = require('../controllers/controller')

route.get('/',TodoController.getTodo)
route.post('/',TodoController.postTodo)
route.get('/:id',TodoController.getTodoId)
route.put('/:id',TodoController.putTodo)
route.patch('/:id',TodoController.patchTodoId)
route.delete('/:id',TodoController.deleteTodoId)

module.exports = route
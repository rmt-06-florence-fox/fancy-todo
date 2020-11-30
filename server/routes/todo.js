const routes = require('express').Router()
const { TodoController } = require('../controllers')
const authorization = require('../middlewares/authorization')

routes.post('/', TodoController.inputTodo)
routes.get('/', TodoController.showTodo)

// ! authorize first
routes.use('/:id', authorization)
routes.get('/:id', TodoController.showById)
routes.put('/:id', TodoController.editTodo)
routes.patch('/:id', TodoController.editStatusTodo)
routes.delete('/:id', TodoController.deleteTodo)

module.exports = routes
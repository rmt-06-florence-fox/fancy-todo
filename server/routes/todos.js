const todos = require('express').Router()
const { TodoController } = require('../controllers')

todos.post('/', TodoController.create)
todos.get('/', TodoController.read)
todos.get('/:id', TodoController.findId)
todos.put('/:id', TodoController.updateAll)
todos.patch('/:id', TodoController.updateStatus)
todos.delete('/:id', TodoController.delete)

module.exports = todos
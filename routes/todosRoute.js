const route = require('express').Router()
const TodoController = require('../controllers/todoController')

route.post('/', TodoController.create)
route.get('/', TodoController.getTodos)

route.get('/:id', TodoController.findById)

route.put('/:id', TodoController.put)

module.exports = route
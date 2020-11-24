const route = require('express').Router()
const TodoController = require('../controllers/todoController')
const authentication = require('../middlewares/authentication')

route.post('/', authentication, TodoController.create)
route.get('/', authentication, TodoController.getTodos)

route.get('/:id', TodoController.findById)

route.put('/:id', TodoController.put)

route.patch('/:id', TodoController.patch)

route.delete('/:id', TodoController.remove)

module.exports = route
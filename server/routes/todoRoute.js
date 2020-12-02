const route = require('express').Router()
const { TodoController } = require('../controllers/controller')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')


route.use(authentication)
route.get('/', TodoController.getTodo)
route.post('/', TodoController.postTodo)
route.get('/weather',TodoController.weatherApi)
route.get('/:id',authorization,TodoController.getTodoId)
route.put('/:id',authorization,TodoController.putTodo)
route.patch('/:id',authorization,TodoController.patchTodoId)
route.delete('/:id',authorization,TodoController.deleteTodoId)

module.exports = route
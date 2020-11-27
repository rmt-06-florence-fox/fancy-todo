const route = require('express').Router()
const UserController = require('../controllers/UserController')
const TodoController = require('../controllers/TodoController')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorized')

route.post('/register', UserController.addUser)
route.post('/login', UserController.login)
route.post('/googleLogin', UserController.googleLogin)


route.use(authentication)
route.get('/todos', TodoController.listTodos)
route.post('/todos', TodoController.addTodos)

route.use('/todos/:id', authorization)
route.patch('/todos/:id', TodoController.updateTodos)
route.put('/todos/:id', TodoController.editTodos)
route.get('/todos/:id', TodoController.detailTodo)
route.delete('/todos/:id', TodoController.deleteTodo)

route.get('/holidays', TodoController.holidays)


module.exports = route
const route = require('express').Router()
const Controller = require('../controllers/controller')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorized')

route.post('/user/register', Controller.addUser)
route.post('/user/login', Controller.login)


route.use(authentication)
route.get('/todos', Controller.listTodos)
route.post('/todos/add', Controller.addTodos)

route.patch('/todos/updateStatus/:id', authorization, Controller.updateTodos)
route.put('/todos/edit/:id', authorization, Controller.editTodos)
route.get('/todos/:id', authorization, Controller.detailTodo)
route.delete('/todos/delete/:id', authorization, Controller.deleteTodo)

route.get('/holidays', Controller.holidays)

module.exports = route
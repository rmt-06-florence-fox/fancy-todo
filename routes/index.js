const route = require('express').Router()
const Controller = require('../controllers/controller')


route.get('/todos', Controller.listTodos)
route.post('/todos/add', Controller.addTodos)
route.patch('/todos/updateStatus/:id', Controller.updateTodos)
route.put('/todos/edit/:id', Controller.editTodos)
route.get('/todos/:id', Controller.detailTodo)
route.delete('/todos/delete/:id', Controller.deleteTodo)

route.post('/user/register', Controller.addUser)
route.post('/user/login', Controller.login)

module.exports = route
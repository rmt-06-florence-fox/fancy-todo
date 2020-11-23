const route = require("express").Router()
const TodoController = require("../controllers/todoControllers")
const UserController = require("../controllers/userControllers")


route.get('/todos', TodoController.getTodos)
route.post('/todos', TodoController.addTodo)
route.get('/todos/:id', TodoController.filterId)
route.put('/todos/:id', TodoController.putTodos)
route.patch('/todos/:id', TodoController.editStatusTodo)
route.delete('/todos/:id', TodoController.deleteId)

route.post('/register', UserController.register)
route.post('/login', UserController.login)

module.exports = route
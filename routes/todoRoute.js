const route = require('express').Router()
const {TodoController} = require('../controller/index.js')




route.get('/', TodoController.getData)
route.get('/:id', TodoController.getDataById)
route.post('/', TodoController.createTodo)
route.put('/:id', TodoController.replaceTodo)
route.patch('/:id',TodoController.modifyTodo)
route.delete('/:id', TodoController.destroyTodo)


module.exports = route
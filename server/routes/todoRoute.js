const route = require('express').Router()
const {TodoController} = require('../controller/index.js')
const authentication = require('../midleware/authentication.js')
const authorization = require('../midleware/authorization.js')






route.use(authentication)

route.get('/', TodoController.getData)
route.post('/', TodoController.createTodo)
route.get('/:id',TodoController.getDataById)

route.use('/:id',authorization)
route.put('/:id',TodoController.replaceTodo)
route.patch('/:id',TodoController.modifyTodo)
route.delete('/:id', TodoController.destroyTodo)


module.exports = route
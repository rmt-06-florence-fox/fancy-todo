const route = require('express').Router()
const { TodoController } = require('../controllers/controller')

route.post('/',TodoController.postTodo)


module.exports = route
const express = require('express')
const Controller = require('../controllers')
const todoRoute = express.Router()
const authentication = require('../middlewear/authentication')
const authorization = require('../middlewear/authorization')

todoRoute.use(authentication)
todoRoute.get('/', Controller.listTodo)
todoRoute.post('/', Controller.addTodo)
todoRoute.get('/:id', Controller.searchbyid)
todoRoute.put('/:id', authorization, Controller.replaceTodo) 
todoRoute.patch('/:id', authorization, Controller.updateData)
todoRoute.delete('/:id', authorization, Controller.deletedTodo)

module.exports = todoRoute
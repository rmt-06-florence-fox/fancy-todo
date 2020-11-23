const express = require('express')
const Controller = require('../controllers')
const todoRoute = express.Router()

todoRoute.get('/', Controller.listTodo)
todoRoute.post('/', Controller.addTodo)
todoRoute.get('/:id', Controller.searchbyid)
todoRoute.put('/:id', Controller.replaceTodo) 
todoRoute.patch('/:id', Controller.updateData)
todoRoute.delete('/:id', Controller.deletedTodo)

module.exports = todoRoute
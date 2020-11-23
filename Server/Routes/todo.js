const todoRouter = require('express').Router()
const {TodoController} = require('../Controllers/controller')

todoRouter.post('/', TodoController.createTodo)
todoRouter.get('/', TodoController.readAllData)
todoRouter.get('/:id', TodoController.findDataByPk)
todoRouter.put('/:id', TodoController.replaceData)
todoRouter.patch('/:id', TodoController.modifyData)
todoRouter.delete('/:id', TodoController.deleteData)

module.exports = todoRouter
const todoRouter = require('express').Router()
const {TodoController} = require('../Controllers/controller')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

todoRouter.use(authentication)
todoRouter.post('/', TodoController.createTodo)
todoRouter.get('/', TodoController.readAllData)

todoRouter.use('/:id', authorization)
todoRouter.get('/:id', TodoController.findDataByPk)
todoRouter.put('/:id', TodoController.replaceData)
todoRouter.patch('/:id', TodoController.modifyData)
todoRouter.delete('/:id', TodoController.deleteData)

module.exports = todoRouter
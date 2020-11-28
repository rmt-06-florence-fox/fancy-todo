const route = require('express').Router()
const authentication = require('../middleware/authentication')
const authorization = require('../middleware/authorization')
const Controller = require('../controllers/todoController')  

route.use(authentication)
route.post('/', Controller.createTodo)
route.get('/',Controller.getTodo)
route.get('/completed',Controller.completedTodo)
route.get('/unfinished',Controller.unfinishedTodo)
route.get('/:id',Controller.getTodoById)
route.put('/:id', authorization, Controller.updateTodo)
route.patch('/:id',authorization, Controller.modifyStatusTodo)
route.delete('/:id', authorization, Controller.destroyTodo)

module.exports = route
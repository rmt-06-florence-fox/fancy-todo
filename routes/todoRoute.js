const route = require('express').Router()
const Controller = require('../controllers/controller')  

route.post('/', Controller.createTodo)
route.get('/',Controller.getTodo)
route.get('/:id',Controller.getTodoById)
route.put('/:id', Controller.updateTodo)
route.patch('/:id', Controller.modifyStatusTodo)
route.delete('/:id', Controller.destroyTodo)

module.exports = route
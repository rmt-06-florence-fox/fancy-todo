const route = require('express').Router()
const TodoController = require('../controllers/todoController')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

route.post('/', authentication, TodoController.create)
route.get('/', authentication, TodoController.getTodos)

route.get('/holiday', TodoController.listHoliday)

route.get('/:id', authentication, authorization,TodoController.findById)

route.put('/:id', authentication, authorization, TodoController.put)

route.patch('/:id', authentication, authorization, TodoController.patch)

route.delete('/:id', authentication, authorization, TodoController.remove)

module.exports = route
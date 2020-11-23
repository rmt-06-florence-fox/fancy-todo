const routerTodo = require('express').Router()
const { ControllerTodo } = require ('../controllers/index')

routerTodo.get('/', ControllerTodo.get)
routerTodo.post('/', ControllerTodo.post)
routerTodo.get('/:id', ControllerTodo.getId)
routerTodo.put('/:id', ControllerTodo.putId)
routerTodo.patch('/:id', ControllerTodo.patchId)
routerTodo.delete('/:id', ControllerTodo.deleteId)


module.exports = routerTodo
const routerTodo = require('express').Router();
const { ControllerTodo } = require('../controllers/index');
const authO = require ('../middlewares/authO')

routerTodo.get('/', ControllerTodo.get);
routerTodo.post('/', ControllerTodo.post);
routerTodo.get('/:id', authO, ControllerTodo.getId);
routerTodo.put('/:id', authO, ControllerTodo.putId);
routerTodo.patch('/:id', authO, ControllerTodo.patchId);
routerTodo.delete('/:id', authO, ControllerTodo.deleteId);

module.exports = routerTodo;

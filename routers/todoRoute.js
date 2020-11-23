const express = require('express');
const route = express.Router();
const todosController = require('../Controllers');


route.get('/', todosController.getTodos);
route.post('/', todosController.postTodos);
route.get('/:id', todosController.findOneTodo);
route.put('/:id', todosController.updateTodo);
route.patch('/:id', todosController.updateStatusTodo);
route.delete('/:id', todosController.removeTodo);
module.exports = route;
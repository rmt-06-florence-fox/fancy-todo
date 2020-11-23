const TodoRoutes = require('express').Router();
const { TodoController } = require('../controller');

TodoRoutes.post('/', TodoController.createTodo);

TodoRoutes.get('/', TodoController.getTodos);

TodoRoutes.get('/:id', TodoController.getTodoId);

TodoRoutes.put('/:id', TodoController.editTodo);

TodoRoutes.patch('/:id', TodoController.editStatus);

TodoRoutes.delete('/:id', TodoController.deleteTodo);

module.exports = TodoRoutes;

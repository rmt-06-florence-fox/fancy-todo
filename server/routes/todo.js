const TodoRoutes = require('express').Router();
const { TodoController } = require('../controller');
const authentication = require('../middlewares/authentication');
const authorization = require('../middlewares/authorization');

TodoRoutes.use(authentication);

TodoRoutes.post('/', TodoController.createTodo);

TodoRoutes.get('/', TodoController.getTodos);

TodoRoutes.get('/:id', TodoController.getTodoId);

TodoRoutes.put('/:id', authorization, TodoController.editTodo);

TodoRoutes.patch('/:id', authorization, TodoController.editStatus);

TodoRoutes.delete('/:id', authorization, TodoController.deleteTodo);

module.exports = TodoRoutes;

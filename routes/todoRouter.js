const express = require ('express');
const todoRouter = express.Router();

const TodoController = require('../controllers/TodoController.js');

todoRouter.post('/', TodoController.createTodo);
todoRouter.get('/', TodoController.showTodo);
todoRouter.get('/:id', TodoController.showTodoById);
todoRouter.put('/:id', TodoController.replaceTodo);
todoRouter.patch('/:id', TodoController.modifyTodo);
todoRouter.delete('/:id', TodoController.deleteTodo);


module.exports = todoRouter;
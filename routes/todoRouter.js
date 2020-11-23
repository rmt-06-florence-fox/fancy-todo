const express = require ('express');
const todoRouter = express.Router();

const TodoController = require('../controllers/TodoController.js');

todoRouter.post('/todos', TodoController.createTodo);
todoRouter.get('/todos', TodoController.showTodo);
todoRouter.get('/todos/:id', TodoController.showTodoById);
todoRouter.put('/todos/:id', TodoController.replaceTodo);
todoRouter.patch('/todos/:id', TodoController.modifyTodo);
todoRouter.delete('/todos/:id', TodoController.deleteTodo);


module.exports = todoRouter;
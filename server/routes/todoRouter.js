const express = require ('express');
const todoRouter = express.Router();
const authentication = require('../middlewares/authentication.js');
const authorization = require('../middlewares/authorization.js');

const TodoController = require('../controllers/TodoController.js');
const router = require('./index.js');

todoRouter.use(authentication)
todoRouter.post('/', TodoController.createTodo);
todoRouter.get('/', TodoController.showTodo);

todoRouter.use('/:id', authorization)
todoRouter.get(TodoController.showTodoById);
todoRouter.put(TodoController.replaceTodo);
todoRouter.patch(TodoController.modifyTodo);
todoRouter.delete(TodoController.deleteTodo);


module.exports = todoRouter;
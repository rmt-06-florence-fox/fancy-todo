const express = require ('express');
const todoRouter = express.Router();
const authentication = require('../middlewares/authentication.js');
const authorization = require('../middlewares/authorization.js');

const TodoController = require('../controllers/TodoController.js');

todoRouter.use(authentication)
todoRouter.post('/', TodoController.createTodo);
todoRouter.get('/', TodoController.showTodo);

todoRouter.use('/:id', authorization)
todoRouter.get('/:id', TodoController.showTodoById);
todoRouter.put('/:id', TodoController.replaceTodo);
todoRouter.patch('/:id', TodoController.modifyTodo);
todoRouter.delete('/:id', TodoController.deleteTodo);


module.exports = todoRouter;
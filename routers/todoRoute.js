const express = require('express');
const route = express.Router();
const TodoController = require('../Controllers').TodoController;
const authentication = require('../middlewares/authentication');
const authorization = require('../middlewares/authorization');

route.use(authentication);
route.get('/', TodoController.getTodos);
route.post('/', TodoController.postTodos);

route.use('/:id', authorization);
route.get("/:id", TodoController.findOneTodo);
route.put("/:id", TodoController.updateTodo);
route.patch("/:id", TodoController.updateStatusTodo);
route.delete("/:id", TodoController.removeTodo);

module.exports = route;
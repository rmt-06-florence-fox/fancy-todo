const express = require('express');
const route = express.Router();
const TodoController = require('../Controllers').TodoController;
const authentication = require('../middlewares/authentication');
const authorization = require('../middlewares/authorization');

route.get('/holidayList', TodoController.holidayList);

route.use(authentication);
route.get('/', TodoController.getTodos);
route.post('/', TodoController.postTodos);

route.get("/:id", TodoController.findOneTodo);

route.use('/:id', authorization);
route.put("/:id", TodoController.updateTodo);
route.patch("/:id", TodoController.updateStatusTodo);
route.delete("/:id", TodoController.removeTodo);

module.exports = route;
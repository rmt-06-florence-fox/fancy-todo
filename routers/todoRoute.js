const express = require('express');
const route = express.Router();
const todosController = require('../Controllers');


route.get('/', todosController.getTodos);
route.post('/', todosController.postTodos);

module.exports = route;
const express = require('express');
const router = express.Router();
const Controller = require('../controllers/Controller')

router.post('/register', Controller.register)
router.post('/login', Controller.login)

router.post('/todos', Controller.addTodo)
router.get('/todos', Controller.todoList)

router.get('/todos/:id', Controller.getTodo)

router.put('/todos/:id', Controller.updateTodo)

router.patch('/todos/:id', Controller.updateStatusTodo)

router.delete('/todos/:id', Controller.deleteTodo)


module.exports = router
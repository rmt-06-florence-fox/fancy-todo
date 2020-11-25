const express = require('express');
const router = express.Router();
const Controller = require('../controllers/Controller')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

router.post('/register', Controller.register)
router.post('/login', Controller.login)

router.get('/weather', Controller.weather)

// Todo
router.use(authentication)
router.get('/todos', Controller.todoList)

router.post('/todos', Controller.addTodo)

// router.use(authorization)
router.get('/todos/:id', authorization, Controller.getTodo)

router.put('/todos/:id', authorization, Controller.updateTodo)

router.patch('/todos/:id', authorization, Controller.updateStatusTodo)

router.delete('/todos/:id', authorization, Controller.deleteTodo)


module.exports = router
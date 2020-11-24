const express = require('express')
const router = express.Router()
const { TodoController } = require('../controllers/index')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

router.use(authentication)
router.post('/', TodoController.createTodo)
router.get('/', TodoController.getTodos)
router.get('/:id', authorization, TodoController.getTodoById)
router.put('/:id', authorization, TodoController.updateTodo)
router.patch('/:id', authorization, TodoController.updateStatus)
router.delete('/:id', authorization, TodoController.deleteTodo)

module.exports = router
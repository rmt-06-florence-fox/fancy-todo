const express = require('express')
const router = express.Router()

const TodoController = require('../controllers/todoController')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

router.use(authentication)
router.get('/', TodoController.findAll)
router.post('/', TodoController.addTodo)
router.get('/:id', authorization, TodoController.getTodo)
router.put('/:id', authorization, TodoController.changeTodo)
router.patch('/:id', authorization, TodoController.editStatus)
router.delete('/:id', authorization, TodoController.destroyTodo)

module.exports = router
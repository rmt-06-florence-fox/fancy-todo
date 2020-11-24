const router = require('express').Router()
const { TodoController } = require('../controllers')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

router.use(authentication)
router.post('/', TodoController.createTodo)
router.get('/', TodoController.getTodo)

router.use('/:id', authorization)
router.get('/:id', TodoController.getOneTodo)
router.put('/:id', TodoController.editTodo)
router.patch('/:id', TodoController.updateTodoStatus)
router.delete('/:id', TodoController.deleteTodo)

module.exports = router
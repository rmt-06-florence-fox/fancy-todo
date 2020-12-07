const router = require('express').Router()
const { TodoController } = require('../controllers')
const { authentication, authorization } = require('../middlewares')

router.use(authentication)
router.get('/', TodoController.readTodos)
router.post('/', TodoController.createTodos)
router.get('/songs', TodoController.playSongs)

router.use('/:id', authorization)
router.get('/:id', TodoController.readTodosById)
router.put('/:id', TodoController.editTodosByRow)
router.patch('/:id', TodoController.editTodosByColumn)
router.delete('/:id', TodoController.deleteTodos)

module.exports = router
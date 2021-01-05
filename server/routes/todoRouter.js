const router = require('express').Router()
const TodoController = require('../controllers/todoController.js')
const authentication = require('../middlewares/authentication.js')
const authorization = require('../middlewares/authorization.js')

router.use(authentication)
router.get('/', TodoController.getAll)
router.post('/', TodoController.createTodo)
router.get('/:id', TodoController.find)

router.use(authorization)
router.put('/:id', TodoController.edit)
router.patch('/:id', TodoController.update)
router.delete('/:id', TodoController.delete)

module.exports = router
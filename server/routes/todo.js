const router = require('express').Router()
const TodoController = require('../controllers/todo')
const authorization = require('../middlewares/authorization')

router.post('/', TodoController.create)
router.get('/', TodoController.get)
router.get('/:id', TodoController.getById)

router.use('/:id', authorization)
router.put('/:id', TodoController.put)
router.patch('/:id', TodoController.patch)
router.delete('/:id', TodoController.delete)

module.exports = router
const router = require('express').Router()
const { TodoController } = require('../controllers')

router.post('/', TodoController.create)
router.get('/', TodoController.getTodos)
router.get('/:id', TodoController.getById)
router.put('/:id', TodoController.update)
router.patch('/:id', TodoController.updateStatus)
router.delete('/:id', TodoController.del)

module.exports = router
const router = require('express').Router()
const { TodoController } = require('../controllers')
const authorized = require('../middlewares/authorization')

router.post('/add', TodoController.create)
router.get('/', TodoController.getTodos)
router.get('/weather', TodoController.weather)
router.get('/:id', authorized, TodoController.getById)
router.put('/:id', authorized, TodoController.update)
router.patch('/:id', authorized, TodoController.updateStatus)
router.delete('/:id', authorized, TodoController.del)

module.exports = router
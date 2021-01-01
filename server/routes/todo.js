const router = require('express').Router()
const {TodoController} = require('../controllers')
const {Authentication, Authorization} = require('../middlewares')


router.use(Authentication)

router.post('/', TodoController.create)
router.get('/', TodoController.getAll)

router.use('/:id',Authorization)
router.get('/:id', TodoController.getById)
router.patch('/:id',TodoController.update)
router.put('/:id',TodoController.change)
router.delete('/:id',TodoController.delete)

module.exports= router
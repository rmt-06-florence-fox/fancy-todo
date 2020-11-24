const router = require('express').Router()
const {TodoController} = require('../controllers')

router.post('/', TodoController.create)
router.get('/', TodoController.getAll)
router.get('/:id', TodoController.getById)
router.patch('/:id', TodoController.update)
router.put('/:id', TodoController.change)
router.delete('/:id', TodoController.delete)

module.exports= router
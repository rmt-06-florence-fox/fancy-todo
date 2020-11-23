const router = require('express').Router()
const { TodosController } = require('../controllers')

router.post('/', TodosController.create)

router.get('/', TodosController.read)

router.get('/:id', TodosController.findOne)

router.put('/:id', TodosController.update)

router.patch('/:id', TodosController.editStatus)

router.delete('/:id', TodosController.delete)

module.exports = router
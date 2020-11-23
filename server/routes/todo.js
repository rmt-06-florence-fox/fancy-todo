const router = require('express').Router()
const {TodoController} = require('../controllers')

router.post('/', TodoController.create)
router.get('/', TodoController.findAll)
router.get('/:id', TodoController.findOne)
router.put('/:id', TodoController.editPut)
router.patch('/:id', TodoController.editPatch)
router.delete('/:id', TodoController.delete)




module.exports = router
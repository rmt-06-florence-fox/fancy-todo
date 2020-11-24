const router = require('express').Router()
const {TodoController} = require('../controllers')
const Authorization = require('../middlewares/authorization')

router.post('/', TodoController.create)
router.get('/', TodoController.findAll)

router.use('/:id', Authorization)
router.get('/:id', TodoController.findOne)
router.put('/:id', TodoController.editPut)
router.patch('/:id', TodoController.editPatch)
router.delete('/:id', TodoController.delete)




module.exports = router
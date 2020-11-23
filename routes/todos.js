const router = require('express').Router()
const {TodosController} = require('../controllers/index')

router.get('/', TodosController.getTodos)
router.post('/', TodosController.createTodos)
// router.get('/:id', TodosController.)
// router.put('/:id', TodosController.)
// router.patch('/:id', TodosController.)
// router.delete('/:id', TodosController.)



module.exports = router
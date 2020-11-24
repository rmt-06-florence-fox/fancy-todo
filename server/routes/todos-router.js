const router = require('express').Router()
const {TodosController} = require('../controllers')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

router.use(authentication)
router.post('/', TodosController.addTodo)
router.get('/', TodosController.allTodo)

router.get('/:id', authorization, TodosController.getTodo)
router.put('/:id', authorization, TodosController.updateTodo)
router.patch('/:id', authorization, TodosController.updateStatus)
router.delete('/:id', authorization, TodosController.delTodo)

module.exports = router
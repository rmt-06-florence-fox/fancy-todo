const express = require('express')
const router = express.Router()
const TodosController = require('../controllers/todosController')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

router.use(authentication)
router.get('/', TodosController.list)
router.post('/', TodosController.addTodos)
router.get('/:id', authorization, TodosController.findTodos)
router.put('/:id', authorization, TodosController.updateTodos)
router.patch('/:id', authorization, TodosController.updateStatusTodos)
router.delete('/:id', authorization, TodosController.deleteTodos)

module.exports = router
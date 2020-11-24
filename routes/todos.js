const express = require('express')
const router = express.Router()
const TodoController = require('../controllers/todos-controller')
const authorization = require('../middlewares/authorize')

router.post('/', TodoController.addTask)
router.get('/', TodoController.showAll)
router.get('/:id', authorization, TodoController.showOne)
router.put('/:id', authorization, TodoController.fullUpdate)
router.patch('/:id', authorization, TodoController.editTask)
router.delete('/:id', authorization, TodoController.delete)

module.exports = router
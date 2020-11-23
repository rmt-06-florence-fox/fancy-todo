const express = require('express')
const router = express.Router()
const TodoController = require('../controllers/todos-controller')

router.post('/', TodoController.addTask)
router.get('/', TodoController.showAll)
router.get('/:id', TodoController.showOne)
router.put('/:id', TodoController.fullUpdate)
router.patch('/:id', TodoController.editTask)
router.delete('/:id', TodoController.delete)

module.exports = router
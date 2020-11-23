const express = require('express')
const Controller = require('../controllers/todo')
const router = express.Router()

router.post('/', Controller.postTodo) //add
router.get('/', Controller.getTodo) //show all

router.get('/:id', Controller.getTodoId)
router.put('/:id', Controller.putTodoId) //updateall

router.patch('/:id', Controller.patchTodo) //updateStat
router.delete('/:id', Controller.deleteTodo)

module.exports = router
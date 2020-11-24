const { resolveInclude } = require('ejs')
const express = require('express')
const Controller = require('../controllers/todo')
const authentication = require('../middlewares/authentication')
const otorisesion = require('../middlewares/autorisesion')
const router = express.Router()

router.use(authentication)
router.post('/', Controller.postTodo) //add
router.get('/',Controller.getTodo) //show all

router.get('/:id', Controller.getTodoId)
router.put('/:id',otorisesion, Controller.putTodoId) //updateall

router.patch('/:id', Controller.patchTodo) //updateStat
router.delete('/:id',otorisesion, Controller.deleteTodo)

module.exports = router
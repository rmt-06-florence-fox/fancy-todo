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

router.use('/:id',otorisesion)
router.put('/:id', Controller.putTodoId) //updateall
router.patch('/:id', Controller.patchTodo) //updateStat
router.delete('/:id', Controller.deleteTodo)

module.exports = router
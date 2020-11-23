const router = require('express').Router()
const Controller = require('../controllers/controller')

router.get('/',Controller.getTodo)
router.post('/',Controller.postTodo)
router.get('/:id',Controller.getTodoById)
router.put('/:id',Controller.modify)
router.patch('/:id',Controller.update)
router.delete('/:id',Controller.deleteTodo)


module.exports = router
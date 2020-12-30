const router = require('express').Router()
const Controller = require('../controllers/controller')
const authentication = require('../middlewares/authentication')
const authorization = require('../middlewares/authorization')

router.use(authentication)
router.get('/',Controller.getTodo)
router.post('/',Controller.postTodo)
router.get('/:id',authorization,Controller.getTodoById)
router.put('/:id',authorization,Controller.modify)
router.patch('/:id',authorization,Controller.update)
router.delete('/:id',authorization,Controller.deleteTodo)


module.exports = router
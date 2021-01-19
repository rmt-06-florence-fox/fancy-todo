const router = require('express').Router();
const authentic = require('../Middlewares/authentic')
const authorize = require('../Middlewares/authorize')

const TodoController = require('../controllers/todoController')

router.use(authentic);
router.get('/', TodoController.showList)
router.post('/', TodoController.addList)

// router.use('/:id', authorize)
router.get( '/:id', authorize,TodoController.getList)
router.put('/:id', authorize, TodoController.putNewList)
router.patch('/:id', authorize, TodoController.patchList)
router.delete('/:id', authorize, TodoController.destroyList)


module.exports = router
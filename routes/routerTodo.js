const router = require('express').Router();
const TodoController = require('../controllers/todoController')

router.get('/', TodoController.showList)
router.post('/', TodoController.addList)
router.get('/:id', TodoController.getList)
router.put('/:id', TodoController.putNewList)
router.patch('/:id', TodoController.patchList)
router.delete('/:id', TodoController.destroyList)


module.exports = router
const router = require('express').Router();
const ToDoController = require('../controllers/todoController');
const authentication = require('../middleware/authentication');
const authorization = require('../middleware/authorization');

router.use(authentication)
router.get('/', ToDoController.listAll);
router.post('/', ToDoController.createToDo)

router.use('/:id', authorization)
router.get('/:id', ToDoController.findData)
router.put('/:id', ToDoController.replaceData)
router.patch('/:id', ToDoController.edit)
router.delete('/:id', ToDoController.delete)

module.exports = router
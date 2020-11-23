const router = require ('express').Router();
const todoController = require('../controllers/todo')

// router.get('/', (req, res) => {
//   res.status(200).json('wkwkw')
// })
router.get('/', todoController.getAllTodos)
router.post('/', todoController.createTodo)

module.exports = router;
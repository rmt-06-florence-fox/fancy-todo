const router = require("express").Router()
const TodoController = require("../controller/todoController")
const authentication = require("../middlewares/authentication")
const authorization = require("../middlewares/authorization")


router.use(authentication)
router.post('/todos', TodoController.add)
router.get('/todos', TodoController.list)
router.put('/todos/:id', authorization, TodoController.edit)
router.get('/todos/:id', authorization, TodoController.findOne)
router.patch('/todos/:id', authorization, TodoController.update)
router.delete('/todos/:id', authorization, TodoController.delete)

module.exports = router
const express = require("express")
const router = express.Router()
const TodosController = require("../controllers/todo.js")
const authenticateUser = require("../middleware/authentication")
const authorization = require("../middleware/authorization")

router.use(authenticateUser)
router.get("/", TodosController.showTodos)
router.post("/", TodosController.createTodo)

router.use("/:id", authorization)
router.get("/:id", TodosController.getTodoById)
router.put("/:id", TodosController.replaceTodo)
router.patch("/:id", TodosController.editStatus)
router.delete("/:id", TodosController.deleteTodo)

module.exports = router
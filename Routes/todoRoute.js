const router = require("express").Router()
const TodoController = require("../controllers/TodoController")


router.get("/", TodoController.getAllTodo)

module.exports = router
const express = require('express')
const router = express.Router()
const Controller = require('../controllers/controller')



router.get("/", Controller.listTodo)
router.post("/create", Controller.createTodo)
router.get("/:id", Controller.findTodoById)
router.post("/delete/:id", Controller.deleteTodo)
router.put("/update/:id", Controller.updateTodo)
router.patch("/update/:id", Controller.updateStatusTodo)


module.exports = router
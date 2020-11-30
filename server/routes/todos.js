const todos = require("express").Router();
const { TodoController } = require("../controllers");
const { authentication, authorization } = require("../middleware");

todos.use(authentication)
todos.post("/", TodoController.create);
todos.get("/", TodoController.read);
todos.get('/waktusolat', TodoController.solat)

todos.use("/:id", authorization)
todos.get("/:id", TodoController.findId);
todos.put("/:id", TodoController.updateAll);
todos.patch("/:id", TodoController.updateStatus);
todos.delete("/:id", TodoController.delete);

module.exports = todos;

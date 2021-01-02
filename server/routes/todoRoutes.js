const route = require("express").Router();
const authorization = require("../middleware/authorization");
const TodoController = require("../controllers/TodoController");

route.post("/", TodoController.add);
route.get("/", TodoController.read);

route.use("/:id", authorization)
route.get("/:id", TodoController.findByPk);
route.put("/:id", TodoController.put);
route.patch("/:id", TodoController.patch);
route.delete("/:id", TodoController.delete);

module.exports = route;
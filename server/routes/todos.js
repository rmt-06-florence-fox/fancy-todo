const router = require("express").Router();
const TodoController = require("../controllers/todo-controller");
const UserController = require("../controllers/user-controller");
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");

router.post("/", authentication, TodoController.postTodo);
router.get("/", authentication, TodoController.getTodo);
router.get("/:id", authentication, TodoController.getTodoId);
router.put("/:id", authentication, authorization, TodoController.putTodoId);
router.patch("/:id", authentication, authorization, TodoController.patchTodoId);
router.delete(
  "/:id",
  authentication,
  authorization,
  TodoController.deleteTodoId
);
router.post("/register", UserController.postRegister);
router.post("/login", UserController.postLogin);

module.exports = router;

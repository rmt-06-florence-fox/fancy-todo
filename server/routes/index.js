const router = require("express").Router();
const todoController = require("../controllers/todoController");
const userController = require("../controllers/userController");
const authentication = require("../middlewares/authentication");
const authorization = require("../middlewares/authorization");

router.post("/register", userController.register);
router.post("/login", userController.login);
//router.post("/glogin", userController.glogin);

router.use(authentication);
router.get("/todos", todoController.read);
router.post("/todos", todoController.create);
router.get("/todos/:id", todoController.readById);
router.put("/todos/:id", todoController.put);
router.patch("/todos/:id", todoController.patch);
router.delete("/todos/:id", authorization, todoController.delete);


module.exports = router;
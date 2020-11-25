const router = require(`express`).Router();
const { TodoController } = require(`../controllers`);
const { authentication, authorization } = require(`../middlewares/auth`);

router.use(authentication);
router.post("/", TodoController.add);
router.get("/", TodoController.show);
router.get("/:id", authorization, TodoController.find);
router.put("/:id", authorization, TodoController.update);
router.patch("/:id", authorization, TodoController.updateStatus);
router.delete("/:id", authorization, TodoController.delete);

module.exports = router;

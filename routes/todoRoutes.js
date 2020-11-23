const router = require(`express`).Router();
const { TodoController } = require(`../controllers`);

router.post("/", TodoController.add);
router.get("/", TodoController.show);
router.get("/:id", TodoController.find);
router.put("/:id", TodoController.update);
router.patch("/:id", TodoController.updateStatus);
router.delete("/:id", TodoController.delete);

module.exports = router;

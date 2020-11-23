const router = require("express").Router()
const { todoController } = require("../controllers")

router.get("/", todoController.todoGet) // read all
router.post("/", todoController.todoPost) // create

router.get("/:id", todoController.todoById) // read by id
router.put("/:id", todoController.todoUpdatePut) // update all by id
router.patch("/:id", todoController.todoUpdatePatch) // update some field by id
router.delete("/:id", todoController.todoDelete) // destroy by id

module.exports = router
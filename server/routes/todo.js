const router = require("express").Router()
const { todoController } = require("../controllers")
const authentication = require("../middlewares/authentication")
const authorization = require("../middlewares/authorization")

router.use(authentication)
router.get("/", todoController.todoGet) // read all 2
router.post("/", todoController.todoPost) // create 2

router.get("/:id", authorization, todoController.todoById) // read by id 
router.put("/:id", authorization, todoController.todoUpdatePut) // update all by id
router.patch("/:id", authorization, todoController.todoUpdatePatch) // update some field by id
router.delete("/:id", authorization, todoController.todoDelete) // destroy by id


module.exports = router
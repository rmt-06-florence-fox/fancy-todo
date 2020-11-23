const router = require("express").Router();
const routeTodo = require("./todos");

router.use("/todos", routeTodo);

module.exports = router;

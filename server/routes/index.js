const router = require("express").Router();
const todoRouter = require("./todos");
const userRouter = require("./user");

router.use("/todos", todoRouter);
router.use("/", userRouter);

module.exports = router;

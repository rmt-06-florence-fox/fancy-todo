const route = require("express").Router();
const todoRoutes = require("../routes/todoRoutes");
const userRoutes = require("../routes/userRoutes");

route.use(userRoutes);
route.use("/todos", todoRoutes);

module.exports = route;
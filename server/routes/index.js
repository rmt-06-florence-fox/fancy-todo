const route = require("express").Router();
const authentication = require("../middleware/authentication");
const todoRoutes = require("../routes/todoRoutes");
const userRoutes = require("../routes/userRoutes");
const weatherRoutes = require("../routes/weatherRoutes");

route.use(userRoutes);

route.use(authentication);
route.use("/todos", todoRoutes);
route.use("/weather", weatherRoutes);



module.exports = route;
const route = require("express").Router();
const authentication = require("../middleware/authentication");
const todoRoutes = require("../routes/todoRoutes");
const userRoutes = require("../routes/userRoutes");
const thirdPartyRoutes = require("./thirdPartyRoutes");

route.use(userRoutes);

route.use(authentication);
route.use("/todos", todoRoutes);
route.use(thirdPartyRoutes);

module.exports = route;
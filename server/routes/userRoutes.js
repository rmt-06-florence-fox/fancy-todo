const route = require("express").Router();
const UserController = require("../controllers/UserController");

route.post("/register", UserController.register);
route.post("/login", UserController.login);
route.post("/googleLogin", UserController.googleLogin);

module.exports = route;
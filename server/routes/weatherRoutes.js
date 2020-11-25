const route = require("express").Router();
const WeatherController = require("../controllers/WeatherController");

route.get("/", WeatherController.getWeather);

module.exports = route;
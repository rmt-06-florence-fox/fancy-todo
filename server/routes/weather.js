const router = require("express").Router()
const WeatherController = require("../controller/weatherController")
const authentication = require("../middlewares/authentication")

router.use(authentication)
router.get("/", WeatherController.weather)

module.exports = router
const router = require('express').Router()
const WeatherController = require('../controllers/weather')

router.get('/', WeatherController.weather)

module.exports = router
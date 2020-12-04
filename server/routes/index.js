const express = require('express')
const router = express.Router()
const todoRoute = require('./todoRoute')
const UserController = require('../controllers/userController')
const WeatherController = require('../controllers/weatherController')
const MusicController = require('../controllers/musicController')

router.use('/todos', todoRoute)
router.use('/register', UserController.register)
router.use('/login', UserController.login)
router.post('/loginGoogle', UserController.loginGoogle);

router.use('/weather', WeatherController.getWeatherJakarta)
router.use('/music', MusicController.getMusic)

module.exports = router
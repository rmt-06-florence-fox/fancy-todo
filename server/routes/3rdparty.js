const thirdPartyRoute = require('express').Router()
const ThirdPartyApi = require('../controllers/3rdparty')

thirdPartyRoute.get('/weather', ThirdPartyApi.getWeather)

module.exports = thirdPartyRoute
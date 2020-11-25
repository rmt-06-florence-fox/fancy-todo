const route = require('express').Router()
const {ApiController} = require('../controller/index.js')

//#3rd PArty API 
route.get('/exchange', ApiController.exchangeAPI)
route.get('/location', ApiController.locationAPI)
route.get('/weather', ApiController.weatherApi)



module.exports = route
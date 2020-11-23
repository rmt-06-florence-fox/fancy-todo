const route = require('express').Router()
const Controller = require('../controllers/controller')


route.get('/', Controller.home)


module.exports = route
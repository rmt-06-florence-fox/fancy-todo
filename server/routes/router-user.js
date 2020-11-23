const routerUser = require('express').Router()
const { ControllerMain } = require ('../controllers/index')

routerUser.get('/', ControllerMain.home)
routerUser.post('/login', ControllerMain.login)
routerUser.post('/register', ControllerMain.register)

module.exports = routerUser
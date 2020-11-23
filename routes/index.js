const route = require('express').Router()
const Controller = require('../controllers/controller')


route.get('/todos', Controller.listTodos)
route.post('/addTodos', Controller.addTodos)
route.patch('/updateStatusTodos/:id', Controller.updateTodos)

route.post('/addUser', Controller.addUser)
route.post('/login', Controller.login)

module.exports = route
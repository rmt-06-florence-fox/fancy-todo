const route = require('express').Router()
const {ProjectController} = require('../controller/index.js')
const authentication = require('../midleware/authentication.js')
const authorization = require('../midleware/authorization.js')

console.log('ROutes')

route.use(authentication)
route.get('/', ProjectController.getProject)
route.post('/', ProjectController.addNewProject)
route.get('/:id', ProjectController.getProjectById)
route.get('/colaborate/:id', ProjectController.getUserByProjectId)
route.put('/:id', ProjectController.replaceProject)
route.delete('/:id',ProjectController.deleteProject)
route.post('/:id', ProjectController.addUserToProject)
route.delete('/deleteUser/:id', ProjectController.deleteUserFromProject)




module.exports = route
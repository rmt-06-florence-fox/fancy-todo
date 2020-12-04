const router = require('express').Router()
const {TodoController} = require('../controller')
const authTest = require('../middleware/authTest')
 
router.get('/', TodoController.show)
router.post('/', TodoController.create)
router.use('/:id', authTest)
router.get('/:id', TodoController.seeList)
router.put('/:id', TodoController.update)
router.patch('/:id', TodoController.patch)
router.delete('/:id', TodoController.delete)

module.exports = router
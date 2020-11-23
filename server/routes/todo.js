const router = require('express').Router()
const {TodoController} = require('../controller')

// router.get('/', TodoController.show)
router.post('/', TodoController.create)
// router.get('/:id', TodoController.seeList)
// router.put('/:id', TodoController.update)
// router.patch('/:id', TodoController.patch)
// router.delete('/:id', TodoController.delete)

module.exports = router
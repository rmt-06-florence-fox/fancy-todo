const router = require('express').Router()
const {TodoController} = require('../controller')
const authentication = require('../middleware/authentication')
const authorization = require('../middleware/Authorization')

router.use(authentication) 
router.get('/', TodoController.show)
router.post('/', TodoController.create)
router.get('/news', TodoController.news)
router.get('/weather', TodoController.weather)
router.use('/:id', authorization)
router.get('/:id', TodoController.seeList)
router.put('/:id', TodoController.update)
router.patch('/:id', TodoController.patch)
router.delete('/:id', TodoController.delete)

module.exports = router
const router = require('express').Router()
const Controller = require('../controllers/controller')

router.post('/',Controller.postTodo)


module.exports = router
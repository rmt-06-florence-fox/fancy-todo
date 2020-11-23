const router = require('express').Router()
const Controller = require('../controllers/controller')

router.get('/',Controller.getTodo)
router.post('/',Controller.postTodo)


module.exports = router
const router = require('express').Router()
const todoRouter = require('./todo')

router.get('/', (req, res) => {
  res.send('Welcome to server fancy todo')
})

router.get('/todos', todoRouter)

module.exports = router
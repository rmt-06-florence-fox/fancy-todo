require('dotenv').config()
const express = require('express')
const app = express()
const port = 3000
const router = require('./routes/index.js')
const errorHandler = require('./middleware/errorHandler')

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use('/', router)
app.use(errorHandler)

app.listen(port, () => {
  console.log(`App running on port ${port}`)
})
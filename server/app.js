const express = require('express')
const app = express()
const PORT = process.env.PORT || 3000
const routes = require('./routes/index.js')
const cors = require('cors')
const errorHandler = require('./middlewares/errorHandler.js')

require('dotenv').config()

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(routes)
app.use(cors())
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`App listen on port : ${PORT}`)
})
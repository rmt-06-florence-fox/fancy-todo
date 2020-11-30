require('dotenv').config()
const cors = require('cors')
const express = require('express')
const app = express()
const routes = require('./routes')
const errorHandler = require('./middlewares/errorhandler')

const port = 3000

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cors())

app.use(routes)
app.use(errorHandler)

app.listen(port, () => {
  console.log(`Listening on port: ${port}`)
})
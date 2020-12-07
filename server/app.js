if (process.env.NODE_ENV === 'development') {
  require('dotenv').config()
}

const express = require('express')
const cors = require('cors')
const app = express()
const router = require('./routes')
const port = process.env.PORT || 3000
const { errorHandler } = require('./middlewares')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())
app.use(router)
app.use(errorHandler)

app.listen(port, () => console.log(`this app running at http://localhost:${port}`))
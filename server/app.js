require('dotenv').config()

const cors = require('cors')
const express = require('express')
const app = express()
const route = require('./routes/index')
const port = process.env.PORT || 3000
const errorHandler = require('./middleware/errorHandler')

app.use(cors())

app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use(route)

app.use(errorHandler)

app.listen(port, () => {
    console.log(`this app running on port ${port}`)
})
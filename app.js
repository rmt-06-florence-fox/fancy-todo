require('dotenv').config()
const express = require('express')
const app = express()
const PORT = 3000
const router = require('./routes/index')

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use('/', router)

app.listen(PORT, () => {
    console.log(`This App running at http://localhost:${PORT}`)
})
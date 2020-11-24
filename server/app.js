require('dotenv').config()
const express = require('express')
const app = express()
const router = require('./routes')
const port = process.env.PORT || 3000

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(router)

app.listen(port, () => console.log(`this app running at http://localhost:${port}`))
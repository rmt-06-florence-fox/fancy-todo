require('dotenv').config()
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const routes = require('./routes')

// ? middleware
app.use(express.urlencoded({extended:true}))
app.use(express.json())
// ? routes
app.use(routes)
// ? listen
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
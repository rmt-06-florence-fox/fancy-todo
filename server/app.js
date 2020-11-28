require('dotenv').config()
const express = require('express')
const app = express()
const port = 3000
const routes = require('./routes/index')
const errHandler = require('./helpers/errorhandler')
const cors = require('cors')
app.use(cors())
app.use(express.urlencoded({extended : false}))
app.use(express.json())
app.use('/', routes)
app.use(errHandler)

app.listen(port, ()=> {
    console.log(`http://localhost:${port}`)
})
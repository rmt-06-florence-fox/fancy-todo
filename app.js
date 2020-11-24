const express = require('express')
const app = express()
const port = 3000
const route = require('./routes/index.js')
require('dotenv').config()
const errorHandler = require('./midleware/errorHandler.js')
//setting

app.use(express.urlencoded({extended:true}))
app.use(express.json())


//route

app.use('/', route)


//error Handler
app.use(errorHandler)

//listen
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })
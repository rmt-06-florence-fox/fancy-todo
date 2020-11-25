const express = require('express')
const app = express()
const port = 3000
const route = require('./routes/index.js')
const errorHandler = require('./midleware/errorHandler.js')
const cors = require('cors')
require('dotenv').config()


//setting
app.use(cors())
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
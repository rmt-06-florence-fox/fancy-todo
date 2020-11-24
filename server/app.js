require('dotenv').config()
const express = require('express')
const router = require('./routes')
const errorHandler = require('./middlewares/error-handler')


const app = express()
const port = 3000

app.use(express.json())
app.use(express.urlencoded({extended : false}))
app.use('/', router)

app.use(errorHandler)
app.listen(port , () => {console.log('i am listening to port : ', port)})
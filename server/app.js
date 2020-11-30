if (process.env.NODE_ENV === 'development') require('dotenv').config()

const cors = require('cors')
const express = require('express')
const router = require('./routes')
const errorHandler = require('./middlewares/error-handler')


const app = express()
const port = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended : false}))
app.use('/', router)

app.use(errorHandler)
app.listen(port , () => {console.log('i am listening to port : ', port)})
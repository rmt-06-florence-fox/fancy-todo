if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
  console.log('masuk development')
} 
const cors = require('cors')
const express = require('express')
const router = require('./routes')
const errorHandler = require('./middlewares/error-handler')

const app = express()
const port = process.env.PORT || 3001

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended : false}))
app.use('/', router)

app.use(errorHandler)
app.listen(port , () => {console.log('i am listening to port : ', port)})
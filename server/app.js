const express = require('express')
const app = express()
const router = require('./routes')
const port = 3000
const cors = require('cors')
const errorHandler = require('./middleware/errorHandler')

require('dotenv').config()
app.use(cors())
app.use(express.urlencoded({extended : false}))
app.use(express.json())
app.use(router)

app.use(errorHandler)

app.listen(port, ()=> {
  console.log(`app is listening to http://localhost:${port}`);
})
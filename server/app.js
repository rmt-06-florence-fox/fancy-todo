if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const express = require('express')
const router = require('./router')
const port = process.env.PORT || 3000;
require('dotenv').config()
const errorHandler = require('./middlewares/errorHandler')
const app = express()


var cors = require('cors')
app.use(cors())

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(router)
app.use(errorHandler)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

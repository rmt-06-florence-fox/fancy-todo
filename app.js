const express = require('express')
const router = require('./router')
const errorHandler = require('./middlewares/errorHandler')
const app = express()
const port = 3000

var cors = require('cors')

 
app.use(cors())

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(router)
app.use(errorHandler)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

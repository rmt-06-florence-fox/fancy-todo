require('dotenv').config()
const express = require('express')
const app = express()
const port = 3000
const router = require ("./routes")
const errorhandler = require ('./middlewares/errorhandler.js')

app.use (express.urlencoded({extended:false}))
app.use(express.json())
app.use ('/', router)
app.use (errorhandler)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
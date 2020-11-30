if (process.env.NODE_ENV === "development") {
  require('dotenv').config()
}

const cors = require ("cors")
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const router = require ("./routes")
const errorhandler = require ('./middlewares/errorhandler.js')
const axios = require ('axios')

app.use(cors())
app.use (express.urlencoded({extended:false}))
app.use(express.json())
app.use ('/', router)
app.use (errorhandler)

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
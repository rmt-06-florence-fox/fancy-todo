require('dotenv').config()
const express = require('express')
const app = express()
const port = 3000
const router = require ("./routes")

app.use (express.urlencoded({extended:false}))
app.use ('/', router)
app.use(express.json())

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
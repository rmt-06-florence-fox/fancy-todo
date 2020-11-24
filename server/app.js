const express = require('express')
const router = require('./routes/index.js')
const app = express()
const PORT = process.env.PORT || 3000

require('dotenv').config();

app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use(router)

app.listen(PORT, () => {
  console.log(`listen at`, PORT)
})
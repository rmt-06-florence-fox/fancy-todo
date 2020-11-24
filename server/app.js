require('dotenv').config();
const express = require('express');
const errorHandler = require('./middleware/errorHandler.js');
const router = require('./routes/index.js')
const app = express()
const PORT = process.env.PORT || 3000

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(router)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log(`listen at`, PORT)
})
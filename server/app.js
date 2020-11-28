require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 3000
const router = require('./routes/router')
// const errorHandling = require('./middlewares/error-handler')

app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(cors())
app.use(router)
// app.use(errorHandling)


app.listen(port, () => {
  console.log(`app running on http://localhost:${port}`);
})
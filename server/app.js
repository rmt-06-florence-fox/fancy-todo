const express = require("express")
const app = express()
const cors = require('cors')
const port = 3000
const router = require("./routes/index.js")
const errorHandler = require("./middleware/errorhandler.js")
require('dotenv').config()

app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(router)
app.use(errorHandler)


app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})
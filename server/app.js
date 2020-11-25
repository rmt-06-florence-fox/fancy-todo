require('dotenv').config()
const express = require('express')

const app = express()
const PORT = 3000
const routes = require('./routes/index')
const cors = require('cors')
const errorHandler = require('./middlewares/errorHandler')

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())

app.use('/',routes)
app.use(errorHandler)


app.listen(PORT,()=>{
    console.log(`app running on http://localhost:${PORT}`)
})
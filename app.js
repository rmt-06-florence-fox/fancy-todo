require('dotenv').config()
const express = require('express')

const app = express()
const PORT = 3000
const routes = require('./routes/index')

app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use('/',routes)


app.listen(PORT,()=>{
    console.log(`app running on http://localhost:3000`)
})
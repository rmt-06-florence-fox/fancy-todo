require('dotenv').config()
const express = require('express')
const app = express()
const port = 3000
const routes = require('./routes/index')
const cors = require('cors')



app.use(express.urlencoded({extended:true}))

app.use(cors())
app.use("/",routes)

app.listen(port, ()=> {
    console.log(`listening on port ${port}`)
})
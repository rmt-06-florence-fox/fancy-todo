require('dotenv').config()
const express = require('express')
const app = express()
const mainRouter = require('./routers/index')
const port = 3000
const cors = require('cors')
const errorHandler = require('./midlleware/errorHandler')

app.use(cors())
// app.use(express.static(__dirname + '/css'));

app.use(express.urlencoded({extended : true}))
app.use(express.json())


//route
app.use('/', mainRouter)
app.use(errorHandler)


app.listen(port, ()=> {
    console.log(`listening on port ${port}`);
})
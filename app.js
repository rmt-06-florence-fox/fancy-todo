require('dotenv').config()
const express = require('express')
const app = express()
const port = 3000
const routes = require('./routes')


app.use(express.urlencoded({extended:false}))

app.use(express.json())

app.use('/', routes)

app.listen(port, () => {
    console.log(`Listening to the port ${port}`);
})
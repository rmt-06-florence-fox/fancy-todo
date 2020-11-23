const express = require('express')
const app = express()
const routes = require('./routes')
const port = process.env.POST || 3000

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(routes)

app.listen(port, ()=>{
    console.log('listen on port ', port);
})
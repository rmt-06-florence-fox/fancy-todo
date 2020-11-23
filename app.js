const { urlencoded } = require('body-parser')
const express = require('express')
const { url } = require('inspector')
const app = express()
const port = 3000
const routes = require('./routes/index')

app.use(express.urlencoded({extended: false}))
app.use(express.json())
app.use(routes)

app.listen(port, () => {
    console.log(`Listening on port: ${port}`);
})
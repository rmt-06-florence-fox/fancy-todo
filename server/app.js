const express = require('express')
const router = require('./routes')

const app = express()
const port = 3000

app.use(express.json())
app.use(express.urlencoded({extended : false}))
app.use('/', router)


app.listen(port , () => {console.log('i am listening to port : ', port)})
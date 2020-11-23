const express = require('express')
const app = express()
port = 3000

app.use(express.urlencoded({extended:false}))
app.use(express.json())

app.use(router)

app.listen(`Hey My port ${port}`)
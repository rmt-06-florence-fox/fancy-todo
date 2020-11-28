require('dotenv').config()
const express = require('express')
const app = express()
const port = 3000
const routes = require('./routes/index')
const errorhandler = require('./middleware/ErrorHandler')
const cors = require('cors')

app.use(cors())
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(routes)
app.use(errorhandler)

app.listen(port, () => {
    console.log(`Hey My port ${port}`);
})


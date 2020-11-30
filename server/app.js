require('dotenv').config()
const express = require('express')
const app = express()
const port = 3000
const router = require('./routes/index')
const cors = require('cors')
const errorhandler = require('./middlewares/errorhandler')

app.use(cors())
app.use(express.urlencoded({extended: false}))
app.use(express.json())

app.use(router)

app.use(errorhandler)

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`)
})
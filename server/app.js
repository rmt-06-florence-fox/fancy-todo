require('dotenv').config()
const cors = require('cors')
const express = require('express')
const app = express()
const PORT = 3000
const router = require('./routes/index')
const errorhandler = require('./middlewares/errorhandler')

app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use('/', router)

app.use(errorhandler)

app.listen(PORT, () => {
    console.log(`This App running at http://localhost:${PORT}`)
})
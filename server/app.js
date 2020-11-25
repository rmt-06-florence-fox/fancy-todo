require('dotenv').config()
const express = require('express')
const app = express()
const port = 3000
const routes = require('./routes')
const errorhandler = require('./middlewares/errorhandler')
const cors = require('cors')

app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(cors())
app.use('/', routes)
app.use(errorhandler)

app.listen(port, () => {
    console.log(`Listening to the port ${port}`);
})
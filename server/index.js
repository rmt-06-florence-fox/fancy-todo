require('dotenv').config()
const express = require('express')
const app = express()
const port = +process.env.PORT || 3000
const routes = require('./routes')
const errorhandler = require('./middlewares/error-handler')
const cors = require('cors')

// ? middleware / body parser
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())
// ? routes
app.use(routes)
// ? error handler
app.use(errorhandler)
// ? listen
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`))
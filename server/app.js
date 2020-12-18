require('dotenv').config()
const express = require('express')
const router = require('./routers')
const { errorHandler } = require('./middlewares')
const cors = require('cors')    
const app = express();
const PORT = 3001;

app.use(cors())
app.use(express.urlencoded({extended: false}))
app.use(express.json()) 
app.use(router)
app.use(errorHandler)
const date = "2020-11-20"
console.log(new Date(date).toISOString().substr(0,10))

app.listen(PORT, () => console.log(`listening at http://localhost:${PORT}`))
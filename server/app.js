const express = require("express")
const app = express()
const PORT = 3000
const router = require('./routes/todo')
const user = require('./routes/user')
const weather = require("./routes/weather")
const errorHandler = require("./middlewares/errorHandler")
const cors = require('cors');

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use('/users', user)
app.use('/weather', weather)
app.use(router)
app.use(errorHandler)

app.listen(PORT, () =>{
    console.log("App is running on http://localhost:" + PORT)
})
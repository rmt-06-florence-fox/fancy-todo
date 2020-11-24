require('dotenv').config()
const express = require('express')
const app = express()
const port = 3000
const route = require('./routes/index')


app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use('/', route)

app.use((err, req, res, next) => {
    if (err.name === 'SequelizeValidationError') {
        let arrErrors = []
        for (let i = 0; i < err.errors.length; i++) {
            arrErrors.push({message: err.errors[i].message})
        }
        res.status(400).json(arrErrors)
    } else {
        res.status(err.status).json({message: err.message})
    }
})


app.listen(port, () => {
    console.log(`running on http://localhost:${port}`)
})
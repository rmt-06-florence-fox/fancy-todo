require("dotenv").config()
const cors = require("cors")
const express = require("express")
const app = express()
const port = 3000
const routes = require("./Routes")

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.use(cors())
app.use(routes)

app.use((err, req, res, next) => {
    console.log("masuk error handling")
    console.log(err)
    if (err.name === "Invalid Account") {
        res.status(401).json({msg: err.name})
    } else if (err.name === "SequelizeValidationError") {
        res.status(400).json({msg: err.errors[0].message})
    } else if(err.name === "DataNotFound") {
        res.status(404).json({msg: err.name})
    } else if (err.name === "SequelizeUniqueConstraintError") {
        res.status(400).json({msg: err.errors[0].message})
    } else if (err.name === "Login First") {
        res.status(401).json({msg: err.name})
    } else if (err.name === "Authorized") {
        res.status(401).json({msg: "You are not authorization"})
    } else {
        res.status(500).json(err)
    }

})

app.listen(port, () => {
    console.log(`listen to http://localhost:${port}`)
})
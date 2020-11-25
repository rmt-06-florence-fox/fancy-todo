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

    if(err.status) {
        if(err.msg === "InvalidAccount") {
            res.status(err.status).json({msg: "Invalid Username / Password"})
        } else {
            res.status(err.status).json({msg: err.msg})
        }
    } else {
        if (err.name === "SequelizeValidationError") {
            res.status(400).json({msg: err.errors[0].message})
        } else {
            res.status(500).json({msg: "internal service error"})
            console.log(err)
        }
    }
    res.status(500).json(err)
    console.log(err)
    
    // else {
    // }

})

app.listen(port, () => {
    console.log(`listen to http://localhost:${port}`)
})
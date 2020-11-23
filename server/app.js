let express = require("express")
let app = express()
let PORT = 3000
let routes = require("./routes/index")

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true }))
app.use(routes)

app.listen(PORT, () => {
    console.log(`push this http://localhost:${PORT}`)
})
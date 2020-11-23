const express = require("express")
const app = express()
const port = 3000
const routes = require("./Routes")

app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use(routes)

app.listen(port, () => {
    console.log(`listen to http://localhost:${port}`)
})
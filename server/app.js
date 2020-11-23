const { json } = require("express")
const express = require("express")
const app = express()
const port = 3000
const router = require("./routes/index.js")

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(router)

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})
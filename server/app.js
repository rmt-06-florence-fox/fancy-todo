const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000
const routes = require("./routes")

app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(routes)

app.listen(80, function () {
  console.log('CORS-enabled web server listening on port 80')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

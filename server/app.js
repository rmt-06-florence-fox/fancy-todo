const express = require('express')
const app = express()
const router = require('./routes')
const port = process.env.port || 3000

app.use(express.urlencoded({extended : false}))
app.use(express.json())
app.use(router)

app.listen(port, ()=> {
  console.log(`app is listening to http://localhost:${port}`);
})
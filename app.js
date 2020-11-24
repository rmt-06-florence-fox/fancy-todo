const express = require('express')
const app = express()
const port = 3000
const routes = require("./routes")
const route = require('./routes/TodoRouter')

app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(routes)
app.use((e, req, res,next)=>{
  if(e.name == 'SequelizeValidationError'){
    console.log(e)
    res.status(400).json({message: `${e.message}`})
  } else {
    res.status(500).json({message: 'internal server error'})
  }
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

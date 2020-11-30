const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000
const routes = require("./routes")

app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(routes)
app.use((e, req, res,next)=>{
  if(e.name == 'SequelizeValidationError'){
    console.log(e)
    res.status(400).json({message: `${e.message}`})
  } else {
    console.log(e)
    res.status(500).json({message: 'internal server error'})
  }
})

app.listen(80, function () {
  console.log('CORS-enabled web server listening on port 80')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})

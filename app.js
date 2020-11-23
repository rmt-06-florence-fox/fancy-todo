const express = require('express')
const app = express()
const port = 3000
const route = require('./routes/index.js')

//setting

app.use(express.urlencoded({extended:true}))
app.use(express.json())


//route

app.use('/', route)
// app.get('/', (req, res) => {
//     res.send('Hello World!')
//   })
  
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
  })
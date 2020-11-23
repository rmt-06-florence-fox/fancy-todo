const express = require('express')
const {TodoRouter} = require('./routes')

const app = express();
const port = 3000;


app.use(express.urlencoded({extended:false}))
app.use(express.json())

app.use('/',TodoRouter)

app.listen(port,()=>{
  console.log(port);
})
require('dotenv').config()
const express = require('express')
const MainRouter = require('./routes')
const app = express();
const port = 3000;


app.use(express.urlencoded({extended:false}))
app.use(express.json())

app.use('/',MainRouter)

app.listen(port,()=>{
  console.log(port);
})
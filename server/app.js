const express = require('express')
const app = express();
const port = 3000;

app.use(express.urlencoded({extended:false}))
app.use(express.json())

app.get('/',(req,res)=>{
  res.send('bismillah')
})

app.listen(port,()=>{
  console.log(port);
})
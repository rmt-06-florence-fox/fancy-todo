const express = require('express')

const app = express()
const PORT = 3000

app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.get('/',(req,res)=>{
    res.status(200).json({msg: "Hello from app.js"})
})


app.listen(PORT,()=>{
    console.log(`app running on http://localhost:3000`)
})
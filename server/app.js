const express = require ('express')
const router = require('./routes/index')
const app = express()

const PORT = 3000

app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use('/', router)

// app.get('/', (req, res)=>{
//   res.status(200).json([
//     {
//       id: 1,
//       name: "bento"
//     }
//   ])
// });

app.listen(PORT, ()=>{
  console.log(`listening at http://localhost:${PORT}`);
})
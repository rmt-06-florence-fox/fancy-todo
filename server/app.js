require('dotenv').config()
const express = require ('express')
const cors = require('cors')
const router = require('./routes/index')
const errorhandler = require('./middleware/errorhandler')
const app = express()

const PORT = 3000

app.use(cors())
app.use(express.json() )
app.use(express.urlencoded({extended: false}))
app.use('/', router)

app.use(errorhandler)

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
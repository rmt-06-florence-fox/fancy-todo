const express = require('express')
const app = express()
const port = 3000
const routes = require('./routes/index')

// app.use('/', routes)
app.use(express.urlencoded({extended:false}))
app.use(express.json())
app.use(routes)

// route.get('/', (req, res) => {
//     // res.send('masuk routersss')
//     res.status(200).json([
//         {
//             "title": "Learn REST API",
//             "description": "Learn how to create RESTful API with Express and Sequelize",
//             "due_date": "2020-01-29"
//         }
//     ])
// }) => ini enggak, dipindah ke routers todod, kemudian buat use
// terus import si route nya


app.listen(port, () => {
    console.log(`Hey My port ${port}`);
})


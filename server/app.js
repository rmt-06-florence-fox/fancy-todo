if(process.env.NODE_ENV !== 'production') {  
    require('dotenv').config()
}
const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT || 3000
const routes = require('./routes/index.js')
app.use(express.urlencoded({extended:true}))
app.use(express.json())
app.use(cors())

app.use('/', routes)
app.use((err, req, res, next) => {
    if (err.status) {
        res.status(err.status).json(err.message)
    }else if(err.name == 'SequelizeValidationError'){
        res.status(400).json(err.errors[0].message)
    }else{
        console.log(err);
        res.status(500).json(`oops sorry, it seems any problem from server`)
    }
})
app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})
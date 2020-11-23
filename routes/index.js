const route = require("express").Router()
// const Controller = require("../controllers/controllers")


route.get('/', (req, res)=>{
    res.send('cobacoba')
})

module.exports = route
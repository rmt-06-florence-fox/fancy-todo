const express = require('express');
const router = require('./routers')
const app = express();
const PORT = 3000;
const { Op } = require('./models')

app.use(express.urlencoded({extended: false}))
app.use(express.json()) 
app.use(router)
console.log("11/22/2020" > new Date().toLocaleDateString())

app.listen(PORT, () => console.log(`listening at http://localhost:${PORT}`))
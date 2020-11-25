require('dotenv').config()
const express = require('express')
const MainRouter = require('./routes')
const errorhandler = require('./middlewares/errorhandler')
const app = express();
const port = 3000;
const cors = require('cors')

app.use(cors())
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

app.use('/', MainRouter)

app.use(errorhandler)

app.listen(port, () => {
  console.log(port);
})
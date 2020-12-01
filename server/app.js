if(process.env.NODE_ENV === 'development') {
    require('dotenv').config();
}

// require('dotenv').config()
const cors = require('cors')
const express = require('express')
const route = require('./routes')
const app = express()
const errorHandler = require('./middlewares/errorhandler')
const port = process.env.PORT || 3333

app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/', route)

app.use(errorHandler)

app.listen(port, () => {
    console.log('App running on port', port);
})
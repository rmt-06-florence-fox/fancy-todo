require('dotenv').config()
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const router = require('./routers/index');
const cors = require('cors');
const errorHandler = require('./middlewares/errorHandler');

app.use(cors());

app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.use('/', router);

app.use(errorHandler);

app.listen(port, ()=>{
    console.log(`Listening on port:${port}`);
})
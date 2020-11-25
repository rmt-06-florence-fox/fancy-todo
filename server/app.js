require('dotenv').config();
const cors = require("cors");
const express = require("express");
const app = express();
const PORT = 3000
const routes = require("./routes/index");
const errorHandler = require("./middlewares/errorHandler");

app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(routes);
app.use(errorHandler);

app.listen(PORT, ()=>{
    console.log("Application is listening on http://localhost:"+PORT);
})
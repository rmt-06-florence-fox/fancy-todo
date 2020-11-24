require("dotenv").config();
const express = require("express");
const app = express();
const PORT = 3000;

app.use(express.urlencoded({extended: true}));
app.listen(PORT, () => {
    console.log("Application is listening on http://localhost:",+PORT);
})
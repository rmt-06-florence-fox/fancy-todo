require("dotenv").config();

const express = require("express");
const cors = require("cors");
const app = express();
const PORT = 3000;
const errorHandler = require("./middleware/errorHandler");
const routes = require("./routes");

app.use(cors());

app.use(express.urlencoded( { extended: true }));
app.use(express.json());

app.use(routes);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log("App is running on PORT: ", PORT);
})
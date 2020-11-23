const express = require("express");
const app = express();
const port = 3000;
const routeTodo = require("./routes");

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(routeTodo);

app.listen(port, () => {
  console.log("connected");
});

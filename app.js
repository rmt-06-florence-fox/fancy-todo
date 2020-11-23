const express = require('express');
const app = express();
const port = 3000;
const todoRoute = require('./routes/todoRouter.js');

app.use(express.urlencoded({ extended: false}));
app.use(express.json());
app.use(todoRoute);

app.listen(port, () => {
    console.log('running on port: ', port);
})
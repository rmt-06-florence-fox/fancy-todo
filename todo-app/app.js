// if(process.env.NODE_ENV !== 'production') {
//     require('dotenv');
// }

const express = require('express')
const route = require('./routes')
const app = express()
const port = process.env.PORT || 3333


app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/', route)

app.listen(port, () => {
    console.log('App running on port', port);
})
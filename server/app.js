if (process.env.NODE_ENV === 'development') {
	require('dotenv').config();
}

const express = require('express');
const router = require('./routes');
const errorHandler = require('./middlewares/errorHandler');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use(router);

app.use(errorHandler);

app.listen(port, () => {
	console.log('Listening on PORT :', port);
});

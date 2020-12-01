const TodoController = require('./todo');
const UserController = require('./user');
const axios = require('axios');

class Controller {
	static summaryCovid(req, res, next) {
		axios({
			url: 'https://api.covid19api.com/summary',
			method: 'GET',
		})
			.then((response) => {
				res.status(200).json(response.data.Global);
			})
			.catch((err) => {
				next(err);
			});
	}
}

module.exports = {
	TodoController,
	UserController,
	Controller,
};

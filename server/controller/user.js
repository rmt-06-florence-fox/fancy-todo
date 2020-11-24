const { User } = require('../models');
const jwt = require('jsonwebtoken');
const { comparePassword } = require('../helpers/bcrypt');
const { generateToken } = require('../helpers/jwt');

class UserController {
	static register(req, res, next) {
		const newUser = {
			email: req.body.email,
			username: req.body.username,
			password: req.body.password,
		};

		User.create(newUser, {
			returning: true,
		})
			.then((data) => {
				res.status(201).json({
					id: data.id,
					email: data.email,
				});
			})
			.catch((err) => {
				next(err);
			});
	}

	static login(req, res, next) {
		const email = req.body.email;
		const password = req.body.password;

		User.findOne({
			where: {
				email,
			},
		})
			.then((user) => {
				if (user && comparePassword(password, user.password)) {
					const access_token = generateToken({
						id: user.id,
						username: user.username,
						email: user.email,
					});
					res.status(200).json({ access_token });
				} else {
					const errorName = 'InvalidAccountOrPassword';
					next({
						name: errorName,
					});
				}
			})
			.catch((err) => {
				next(err);
			});
	}
}

module.exports = UserController;

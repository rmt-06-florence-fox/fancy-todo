const { User } = require('../models');
const jwt = require('jsonwebtoken');
const { comparePassword } = require('../helpers/bcrypt');

class UserController {
	static register(req, res) {
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
				res.status(400).json(err);
			});
	}

	static login(req, res) {
		const email = req.body.email;
		const password = req.body.password;

		User.findOne({
			where: {
				email,
			},
		})
			.then((user) => {
				if (user && comparePassword(password, user.password)) {
					const access_token = jwt.sign(
						{
							id: user.id,
							username: user.username,
							email: user.email,
						},
						process.env.SECRET
					);
					res.status(200).json({ access_token });
				} else {
					const error = 'Invalid Account or Password';
					res.status(400).json({ error });
				}
			})
			.catch((err) => {
				res.status(400).json(err);
			});
	}
}

module.exports = UserController;

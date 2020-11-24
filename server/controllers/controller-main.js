const { User } = require('../models/index');
const { compareHash, genToken } = require('../helpers/helper');

class ControllerMain {
	static async home(req, res) {
		try {
			res.status(200).json({ message: 'hello' });
		} catch (err) {
			res.status(500).json({ message: 'error loading page' });
		}
	}

	static async login(req, res) {
		try {
			const getUser = await User.findOne({
				where: {
					email: req.body.email,
				},
			})
			if (compareHash(req.body.password, getUser.password)) {
				const access_token = genToken({
					id: getUser.id,
					email: getUser.email,
				});
				res.status(201).json({ user: getUser, access_token });
			}
		} catch (err) {
			res.status(500).json({ message: `password/email don't match` });
		}
	}

	static async register(req, res) {
		console.log(req.body);
		try {
			const newUSer = await User.create(req.body);
			res.status(201).json({ message: 'acount created' });
		} catch (err) {
			res.status(500).json({ message: err.errors });
		}
	}
}

module.exports = ControllerMain;

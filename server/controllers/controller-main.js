const { User } = require('../models/index');
const { compareHash, genToken } = require('../helpers/helper');

class ControllerMain {
	static async home(req, res, next) {
		try {
			res.status(200).json({ message: 'hello' });
		} catch (err) {
			next(err)
		}
	}

	static async login(req, res, next) {
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
				res.status(201).json({ access_token });
			} else {
				throw {status: 401, message:`password/email don't match`}
			}
		} catch (err) {
			next(err);
		}
	}

	static async register(req, res, next) {
		try {
			const newUser = await User.create(req.body);
			const access_token = genToken({
				id: newUser.id,
				email: newUser.email,
			});
			res.status(201).json({ access_token });
		} catch (err) {
			next(err)
		}
	}
}

module.exports = ControllerMain;

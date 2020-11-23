const bcrypt = require('bcryptjs');
const salt = bcrypt.genSaltSync(+process.env.SALT);
const jwt = require('jsonwebtoken');

class Helper {
	static getHash(pass) {
		return bcrypt.hashSync(pass, salt);
	}

	static compareHash(pass, hash) {
		return bcrypt.compareSync(pass, hash);
	}

	static genToken(data) {
		return jwt.sign(data, process.env.KEY);
	}
}

module.exports = Helper;

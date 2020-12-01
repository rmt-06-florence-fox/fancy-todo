const { verifyToken } = require('../helpers/jwt');
const { User } = require('../models');

module.exports = async (req, res, next) => {
	try {
		const { access_token } = req.headers;
		if (!access_token) {
			const errorName = 'NotLoginYet';
			next({
				name: errorName,
			});
		} else {
			const decoded = verifyToken(access_token);
			console.log(decoded);
			req.loggedInUser = decoded;
			const user = await User.findOne({
				where: {
					id: decoded.id,
				},
			});
			if (user) {
				next();
			} else {
				const errorName = 'NotLoginYet';
				next({
					name: errorName,
				});
			}
		}
	} catch (err) {
		next(err);
	}
};

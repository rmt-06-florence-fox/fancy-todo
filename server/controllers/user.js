const { User } = require('../models')
const { comparePassword } = require('../helpers/bcrypt')
const { signToken } = require('../helpers/jwt')
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

class UserController {
	static async register(req, res, next) {
		try {
			const { email, password } = req.body
			const user = await User.create({ email, password })
			res.status(201).json({ id: user.id, email: user.email })
		} catch (error) {
			res.status(400).json(error)
		}
	}

	static async login(req, res, next) {
		try {
			const { email, password } = req.body
			const user = await User.findOne({ where: { email } })

			if (!user) {
				throw { msg: 'username or password is incorrect' }
			} else if (!comparePassword(password, user.password)) {
				throw { msg: 'username or password is incorrect' }
			} else {
				const payload = { id: user.id, email: user.email }
				const token = signToken(payload)
				res.status(200).json({ access_token: token })
			}
		} catch (error) {
			res.status(400).json(error)
		}
	}

	static googleLogin(req, res, next) {
		let payload
		client
			.verifyIdToken({
				idToken: req.body.googleToken,
				audience: process.env.GOOGLE_CLIENT_ID
			})
			.then((ticket) => {
        console.log('masuk pak eko');
				payload = ticket.getPayload()
				console.log(payload)
				return User.findOne({
					where: {
						email: payload.email,
					},
				})
			})
			.then((data) => {
				if (data) {
					return data
				} else {
					return User.create({
						email: payload.email,
						password: process.env.GOOGLE_PASSWORD,
					})
				}
			})
			.then((user) => {
				const access_token = signToken({
					id: user.id,
					email: user.email,
				})
				res.status(200).json({ access_token })
			})
			.catch((err) => {
				next(err)
			})
	}
}

module.exports = UserController

const { User } = require('../models')
const { comparePwd } = require('../helpers/password')
const { generateToken }= require('../helpers/jsonwebtoken')

class UserController {
  static signUpUser(req, res, next) {
    let userAccount = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    }
    User.create(userAccount)
      .then(data => res.status(201).json({ id: data.id, email: data.email }))
      .catch(error => next(error))
  }

  static async signInUser(req, res, next) {
    try {
      const data = await User.findOne({ where: { email: req.body.email } })
      if (comparePwd(req.body.password, data.password)) {
        const accessToken = generateToken({ id: data.id, email: data.email })
        res.status(200).json({ accessToken })
      } else if (!data) {
        throw { status: 401, email: 'Invalid account' }
      } else {
        throw { status: 400, email: 'Invalid email/password' }
      }
    } catch (error) {
      next(error)
    }
  }
}

module.exports = { UserController }
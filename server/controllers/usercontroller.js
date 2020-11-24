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

  static signInUser(req, res, next) {
    User.findOne({ where: { email: req.body.email } })
      .then(data => {
        if (!data) res.status(401).json({ message: 'Invalid account' })
        else if (comparePwd(req.body.password, data.password)) {
          const accessToken = generateToken({ id: data.id, email: data.email })
          res.status(200).json({ accessToken })
        }
        else res.status(400).json({ message: 'Invalid email / password' })
      })
      .catch(error => next(error))
  }
}

module.exports = { UserController }
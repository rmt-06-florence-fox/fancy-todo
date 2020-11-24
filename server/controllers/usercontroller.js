const { User } = require('../models')
const { comparePwd } = require('../helpers/password')
const jwt = require('jsonwebtoken')

class UserController {
  static signUpUser(req, res) {
    let userAccount = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password
    }
    User.create(userAccount)
      .then((data) => res.status(201).json({ id: data.id, email: data.email }))
      .catch((error) => {
        const filterErrors = error.errors.map(e => {
          const errorDetails = e.validatorArgs.filter(el => {
            if (typeof el.message === 'string') return el.message
          })
          return errorDetails
        })
        res.status(400).json(filterErrors)
      })
  }

  static signInUser(req, res) {
    User.findOne({ where: { email: req.body.email } })
      .then(data => {
        if (!data) res.status(401).json({ message: 'Invalid account' })
        else if (comparePwd(req.body.password, data.password)) {
          const accessToken = jwt.sign({ id: data.id, email: data.email }, 'hahihuheho')
          res.status(200).json({ accessToken })
        }
        else res.status(400).json({ message: 'Invalid email / password' })
      })
      .catch(err => res.status(500).json({ message: 'Internal server error' }))
  }
}

module.exports = { UserController }
const { User } = require('../models')

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

  // static signInUser(req, res) {
  //   let userAccount = {
  //     username: req.body.username,
  //     email: req.body.email,
  //     password: req.body.password
  //   }
  //   User.findOne(userAccount)
  // }

}

module.exports = { UserController }
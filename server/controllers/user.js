const bcrypt = require('bcryptjs')
const { User } = require('../models')
const { generateToken } = require('../helpers/generateToken')


class UserController {

  static register(req, res, next) {
    const newUser = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    }

    User.findOne({
      where: {
        email: newUser.email
      }
    })
    .then(data => {
      if(data) {
        next({name: "EmailAlreadyUsed"})
      } else {
        return User.create(newUser)
      }
    })
    .then(data => {
      res.status(201).json(data)
    })
    .catch(err => {
      next(err)
    })
    
  }

  static login(req, res, next) {
    const {email, password} = req.body

    User.findOne({
      where: {
        email
      }
    })
    .then(user => {
      if(!user||!bcrypt.compareSync(password, user.password)){
        next({name: "InvalidEmailPassword"})
      } else {
        const access_token = generateToken(user)
        res.status(200).json( { access_token })
      }
    })
    .catch(err => {
      next(err)
    })
  }
}

module.exports = UserController
const { User } = require('../models')
const { comparing } = require('../helpers/hashing-comparing')
const jwt = require('jsonwebtoken')

class UserController {
  static async signUp(req, res) {
    const value = {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    }

    try {
      const data = await User.create(value)
      res.status(201).json({
        id: data.id,
        name: data.name,
        email: data.email
      })
    } catch (error) {
      res.status(500).json(error)
    }
  }

  static async signIn(req, res) {
    try {
      const data = await User.findOne({ where: { email: req.body.email } })
      if (!data) {
        res.status(401).json({ message: `Invalid Account` })
      } else if (comparing(req.body.password, data.password)) {
        const token = jwt.sign({
          id: data.id,
          name: data.name,
          email: data.email
        }, process.env.SECRET)
        res.status(200).json({ token })
      } else {
        res.status(401).json({ message: `Invalid email/password` })
      }
    } catch (error) {
      res.status(500).json(error)
    }
  }
}

module.exports = UserController
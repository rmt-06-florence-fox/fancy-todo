const { User } = require('../models')
const { comparing } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')
const {OAuth2Client} = require('google-auth-library')
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

class UserController {
  static async signUp(req, res, next) {
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
      res.status(400).json(error)
    }
  }

  static async signIn(req, res, next) {
    try {
      console.log(req.body.email, req.body.password);
      const data = await User.findOne({ where: { email: req.body.email } })
      if (!data) {
        res.status(404).json({
          msg: `Invalid`
        })
      } else if (comparing(req.body.password, data.password)) {
        const value = {
          id: data.id,
          email: data.email
        }
        const token = generateToken(value)
        res.status(200).json({ token })
      } else {
        res.status(400).json({
          msg: `Invalid email or password`
        })
      }
    } catch (error) {
      res.status(500).json(error)
    }
  }

  static async gSignIn(req, res, next) {
    let value
    client.verifyIdToken({
      idToken: req.body.googleToken,
      audience: process.env.GOOGLE_CLIENT_ID,
    })
    .then(ticket => {
      // console.log(ticket.getPayload())
      payload = ticket.getPayload()
      return User.findOne({
        where: {
          email: payload.email
        }
      })
    })
    .then(data => {
      if (user) {
        return user
      } else {
        return User.create({
          email: payload.email,
          password: process.env.GOOGLE_PASSWORD
        })
      }
    })
    .then(user => {
      const access_token = generateToken({
        id: user.id,
        email: user.email
      })
      res.status(200).json({access_token})
    })
    .catch(err => {
      res.status(500).json(err)
    })
  }
}
module.exports = UserController
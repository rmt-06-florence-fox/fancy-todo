const { User } = require('../models')
const { comparePwd } = require('../helpers/password')
const { generateToken }= require('../helpers/jsonwebtoken')
const {OAuth2Client} = require('google-auth-library')
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)
const sendEmail = require('../helpers/nodemailer')

class UserController {
  static signUpUser(req, res, next) {
    sendEmail(req.body.username, req.body.email)
      .then(() => {
        const userAccount = {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password
        }
        return User.create(userAccount)
      })
      .then(data => {
        const accessToken = generateToken({ id: data.id, email: data.email })
        res.status(201).json({ accessToken })
      })
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

  static googleSignIn(req, res, next) {
    let payload
    client.verifyIdToken({
      idToken: req.body.googleToken,
      audience: process.env.GOOGLE_CLIENT_ID
    })
      .then(ticket => {
        payload = ticket.getPayload()
        return User.findOne({ where: { email: payload.email } })
      })
      .then(user => {
        if (user) return user
        else {
          sendEmail(payload.given_name, payload.email)
          return User.create({
            username: payload.given_name,
            email: payload.email,
            password: process.env.GOOGLE_PASSWORD
          })
        }
      })
      .then(data => {
        const accessToken = generateToken({ id: data.id, email: data.email })
        res.status(200).json({ accessToken })
      })
      .catch (error => next(error))
  }
}

module.exports = { UserController }
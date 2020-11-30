const { User } = require('../models')
const helper = require('../helpers/helper.js')
require('dotenv').config()
const jwt = require('jsonwebtoken')
const { OAuth2Client } = require('google-auth-library')
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID)

class userController {
  static async register (req, res, next) {
    try {
      const obj = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
      }
      const output = await User.create(obj)
      res.status(201).json({
        id: output.id,
        email: output.email
      })
    }
    catch(err) {
      console.log(err, '<< error register')
      next({
        status: 400,
        message: 'Bad Request'
      })
    }
  }

  static async login (req, res, next) {
    try {
      const data = await User.findOne({
        where: { email: req.body.email }
      })
      if (!data) {
        throw {
          status: 400,
          message: 'Invalid Email / Password'
        }
      } else if (helper.comparePassword(req.body.password, data.password)) {
        const access_token = jwt.sign({
          id: data.id,
          email: data.email
        }, process.env.SECRET)
        res.status(200).json({access_token})
      } else {
        throw {
          status: 400,
          message: 'Invalid Email / Password'
        }
      }
    }
    catch(err) {
      next(err)
    }
  }
}

module.exports = userController
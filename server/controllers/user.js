const { User } = require('../models')
const PassHelper = require('../helper/passwordHelper')
const JwtHelper = require('../helper/jwtHelper')
const jwt = require('jsonwebtoken')
const { OAuth2Client } = require('google-auth-library');
const mailer = require('../helper/mailer')
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);


class UserController {

  static async register(req, res, next) {
    let payload = {
      email: req.body.email,
      password: req.body.password
    }
    try {
      if (!payload.email || !payload.password) {
        next({ status: 400, message: 'field tidak boleh kosong' })
      }
      const data = await User.create(payload)
      res.status(201).json({ email: data.email, id: data.id })
    } catch (error) {
      next({ status: 400, message: 'email must be unique' })
    }
  }

  static async login(req, res, next) {
    try {
      const data = await User.findOne({ where: { email: req.body.email } })

      if (data && PassHelper.compare(req.body.password, data.password)) {
        const access_token = JwtHelper.generateToken({ id: data.id, email: data.email })
        res.status(200).json({ access_token })
      } else {
        throw { status: 401, message: "invalid" }
        // res.status(401).json({message:"invalid"})
      }
    } catch (error) {
      next(error);
    }
  }

  static async googleLogin(req, res, next) {
    try {
      const ticket = await client.verifyIdToken({
        idToken: req.body.googleToken,
        audience: process.env.GOOGLE_CLIENT_ID
      });
      const payload = ticket.getPayload();
      const user = await User.findOne({ where: { email: payload.email } })
      if (!user) {
        // res.status(401).json({ msg: "gada" })
        const googleUser = await User.create({email: payload.email, password: process.env.GOOGLE_USER_PASS})
        const access_token = JwtHelper.generateToken({ id: googleUser.id, email: googleUser.email })
        mailer.welcomeMail(payload.email)
        res.status(200).json({ access_token })
      } else {
        const access_token = JwtHelper.generateToken({ id: user.id, email: user.email })
        res.status(200).json({ access_token })
      }

    } catch (error) {
      next(error)
    }


  }
}

module.exports = UserController;
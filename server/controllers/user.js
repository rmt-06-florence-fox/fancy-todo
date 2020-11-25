const { User } = require('../models')
const PassHelper = require('../helper/passwordHelper')
const JwtHelper = require('../helper/jwtHelper')
const jwt = require('jsonwebtoken')

class UserController {

  static async register(req, res, next) {
    let payload = {
      email: req.body.email,
      password: req.body.password
    }
    try {
      if(!payload.email||!payload.password){
        next({status:400 , message:'field tidak boleh kosong'})
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
        res.status(200).json({access_token})
      } else {
        throw { status: 401, message: "invalid" }
        // res.status(401).json({message:"invalid"})
      }
    } catch (error) {
      next(error);
    }
  }
}

module.exports = UserController;
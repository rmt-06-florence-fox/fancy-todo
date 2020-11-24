const{User} = require('../models')
const {verifyHash} = require('../helpers/bcrypt')
const {signToken} = require('../helpers/token')

class UserController{
  static async register(req, res){
    try {
      const{email, password} = req.body

      const register = await User.create({
        email, password
      })

      res.status(201).json({
        id: register.id,
        email: register.email
      })
    } catch (err) {
      if(err.name == 'SequelizeUniqueConstraintError' || err.name == 'SequelizeValidationError') {
        res.status(400).json({
          error: err.errors[0].message
        })
      }

      res.status(500).json({
        err: 'Internal Server Error'
      })
    }
  }

  static async login(req, res) {
    try {
      const{email, password} = req.body

      const login = await User.findOne({
        where: {
          email
        }
      })

      if(!login){
        throw {
          status: 400,
          message: 'Wrong email/password'
        }
      } else if(verifyHash(password,login.password)){
        const access_token = signToken({
          id: login.id,
          email: login.email
        })
        res.status(200).json({
          access_token: access_token
        })
      } else {
        throw {
          status: 400,
          message: 'Wrong email/password'
        }
      }
      
    } catch (err) {
      if(err.status == 400) {
        res.status(err.status).json(err)
      }

      res.status(500)({
        error: 'Internal Server Error'
      })
    }
  }

}
module.exports = UserController
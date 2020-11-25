const {User} = require('../models')
const {compare} = require('../helper/bcrypt')
const {makeToken} = require('../helper/jwt')

class UserController{

  static async register(req,res,next){
    let obj = {
      first_name : req.body.first_name,
      last_name : req.body.last_name,
      email : req.body.email,
      password : req.body.password,
    }
    try {
      const data = await User.create(obj)
      res.status(201).json({
        id : data.id,
        first_name : data.first_name,
        last_name : data.last_name,
        email : data.email
      })
    } catch (error) {
      next(error)
    }
  }

  static async login(req,res,next){
    let obj = {
      email : req.body.email,
      password : req.body.password
    }
    try {
      const data = await User.findOne({where: {email : obj.email}})
      if (!data) {
        throw {
          status : 401,
          message: `invalid email`
        }
      } else {
        const compared = compare(obj.password, data.password)
        if (!compared) {
          throw {
            status : 401,
            message: `invalid password`
          }
        } else {
          let obj = {
            id : data.id,
            first_name : data.first_name,
            last_name : data.last_name,
            email : data.email
          }
          const access_token = makeToken(obj)
          res.status(200).json({access_token})
        }
      }
    } catch (error) {
      next(error)
    }
  }

}

module.exports = UserController
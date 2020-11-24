const {User} = require('../models')
const {compare} = require('../helper/bcrypt')
const {makeToken} = require('../helper/jwt')

class UserController{

  static async register(req,res){
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
      if (error.name == 'SequelizeValidationError') {
        res.status(400).json(error.errors)
      } else {
        res.status(500).json(error)
      }
    }
  }

  static async login(req,res){
    let obj = {
      email : req.body.email,
      password : req.body.password
    }
    try {
      const data = await User.findOne({where: {email : obj.email}})
      if (!data) {
        res.status(401).json({message :`invalid email`})
      } else {
        const compared = compare(obj.password, data.password)
        if (!compared) {
          res.status(401).json({message :`invalid password`})
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
      res.status(500).json(error)
    }
  }

}

module.exports = UserController
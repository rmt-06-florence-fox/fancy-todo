const {User} = require('../models')
const Helper = require('../Helper/helper')
require('dotenv').config()
const jwt = require('jsonwebtoken')

class UserController{
  static async register(req, res, next){
    try{
      const payload = {
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
      }
      const result = await User.create(payload)
      res.status(201).json({ id: result.id, email: result.email })
    }catch(err){
      next({
        status: 400,
        message: err
      })
    }
  }
  static async login(req, res, next){
    try{
      const findData = await User.findOne({ where: { email: req.body.email }})
      if(!findData){
        throw {
          status: 400,
          message: 'Invalid account! '
        }
      } else if(Helper.comparePassword(req.body.password, findData.password)){
        const accessToken = jwt.sign({
          id: findData.id,
          email: findData.email
        }, process.env.SECRET)
        res.status(200).json({accessToken})
      }else{
        throw {
          status: 400,
          message: `Invalid email / password`
        }
      }
    }catch(err){
      next(err)
    }
  }
}

module.exports = UserController
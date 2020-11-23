const {User} = require('../models')
const Helper = require('../Helper/helper')
require('dotenv').config()
const jwt = require('jsonwebtoken')

class UserController{
  static async register(req, res){
    try{
      const payload = {
        username: req.body.username,
        email: req.body.email,
        password: Helper.hashPassword(req.body.password)
      }
      const result = await User.create(payload, { returning: true })
      res.status(201).json({ id: result.id, email: result.email })
    }catch(err){
      res.status(400).json({err})
    }
  }
  static async login(req, res){
    try{
      const findData = await User.findOne({ where: { email: req.body.email }})
      if(!findData) res.status(400).json({message: 'Invalid account! '})
      else if(Helper.comparePassword(req.body.password, findData.password)){
        const accessToken = jwt.sign({
          id: findData.id,
          email: findData.email
        }, process.env.SECRET)
        res.status(200).json({accessToken})
      }else{
        res.status(400).json({message: `Invalid email/password`})
      }
    }catch(err){
      res.status(500).json({message: `Internal server error`})
    }
  }
}

module.exports = UserController
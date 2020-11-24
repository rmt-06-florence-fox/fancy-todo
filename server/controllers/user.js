const {User} = require('../models')

class UserController{
  static async register(req,res){
    let newUser= {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    }
    try {
      let user= await User.create(newUser)
      res.status(200).json({status: '200 OK', message: `Register Success`})
    } catch (err) {
      let message=err.errors[0].message
      res.status(400).json({status: '400 Bad Request', message})
    }
    
  }
  static async login(req,res){
    let data= {
      email: req.body.email,
      password: req.body.password
    }
    try {
      let user= await User.create(newUser)
      res.status(200).json({status: '200 OK', message: `Register Success`})
    } catch (err) {
      let message=err.errors[0].message
      res.status(400).json({status: '400 Bad Request', message})
    }
    
  }
}



module.exports= UserController

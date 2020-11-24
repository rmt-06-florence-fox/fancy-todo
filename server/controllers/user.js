const {User} = require('../models')

class UserController{
  static getUsers(req,res){
    res.send(' Halo ini User dari UserController')
    
  }
  static async register(req,res){
    let newUser= {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    }
    try {
      let user= await User.create(newUser)
      res.status(200).json({status: '200 OK', msg: `Register Success`})
    } catch (err) {
      let message=err.errors[0].message
      res.status(400).json({status: '400 Bad Request', message})
    }
    
  }
}



module.exports= UserController

const {User} = require('../models')
const {checkPassword, jwt} =require('../helpers')

class UserController{
  static async register(req,res){
    let newUser= {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    }
    try {
      let user= await User.create(newUser)
      res.status(201).json({email: user.email, id: user.id})
    } catch (err) {
      let message=err.errors[0].message
      res.status(400).json({status: '400 Bad Request', message})
    }
    
  }
  static async login(req,res){
    let input= {
      email: req.body.email,
      password: req.body.password
    }
    try {
      let user= await User.findOne({where:{email: input.email}})
      if(user == null){
        throw err
      }else if(checkPassword(input.password,user.password)){
        const access_token= jwt.sign({id:user.id, email:user.email, name:user.name},'CocaColaZero')
        res.status(200).json({access_token})
      }else{
        throw err
      }
     
    } catch (err) {
      if(err){
        res.status(400).json({status: 400 , message: 'Invalid Account'})
      }else{
        res.status(500).json({status:500, message: 'Internal Server Error'})
      }
    }
    
  }
}



module.exports= UserController

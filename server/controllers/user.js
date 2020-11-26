const {User} = require('../models')
const {checkPassword, generateToken} =require('../helpers')

class UserController{
  static async register(req,res,next){
    let newUser= {
      name: req.body.name,
      email: req.body.email,
      password: req.body.password
    }
    try {
      let user= await User.create(newUser)
      res.status(201).json({email: user.email, id: user.id})
    } catch (err) {
      next(err)
    }
  }
  static async login(req,res,next){
    let input= {
      email: req.body.email,
      password: req.body.password
    }
    try {
      let user= await User.findOne({where:{email: input.email}})
      if(user == null){
        throw{
          status:404,
          message: "User Not Found"
        }
      }else if(checkPassword(input.password,user.password)){
        const access_token= generateToken({id:user.id, email:user.email, name:user.name})
        res.status(200).json({access_token})
      }else{
        throw{
          status:400,
          message: "Invalid Account"
        }
      }
    } catch (err) {
      next(err)
    }
  }
}



module.exports= UserController

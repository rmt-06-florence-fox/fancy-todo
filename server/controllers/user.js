const {User} = require('../models')
const PassHelper = require('../helper/passwordHelper')
const jwt = require('jsonwebtoken')

class UserController{

  static async register(req,res){
    
    let payload = {
      email : req.body.email,
      password : req.body.password
    }
    try {
      const data =  await User.create(payload)
      res.status(201).json({email: data.email, id:data.id})
    } catch (error) {
      res.status(500).json(error)
    }
  }

  static async login(req,res){
    try {
      const data = await User.findOne({ where : { email : req.body.email}})
      console.log(data);
      if(data && PassHelper.compare(req.body.password, data.password)){
        const access_token = jwt.sign({id:data.id,email:data.email},'apajaboleh')
        console.log(access_token);
        res.status(200).json(access_token)
      }else{
        res.status(401).json({message:"invalid"})
      }
    } catch (error) {
      res.status(500).json(error)
    }
  }
}

module.exports = UserController;
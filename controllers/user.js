const {User} = require('../models')
const helpbcrypt = require('../helpers/bcrypt')
const bcrypt = require('bcryptjs')
const {verifyToken,generateToken} = require('../helpers/jwt')
const jwt = require('jsonwebtoken')

class UserController {
  static register (req,res){
    const newUser = {
      email: req.body.email,
      password: req.body.password
    }
    User.create(newUser)
      .then (data=>{
        res.status(201).json({id: data.id,email: data.email})
      })
      .catch (err=>{
        console.log(err)
        res.status(500).json(err)
      })

  }

  static login(req,res){
    User.findOne({where: {email:req.body.email}})
      .then (data=>{
        if(!data){
          res.status(401).json({message: `Account not Found`})
        }
        else if(helpbcrypt.compare(req.body.password,data.password)){
          const access_token = generateToken({id: data.id,email: data.email})
          res.status(200).json({access_token})
        }
        else{
            res.status(401).json({message: `Invalid emaul/password`})
          }
        
      })
      .catch (err=>{
        console.log(err)
        res.status(500).json(err)
      })

  }
}

module.exports = UserController
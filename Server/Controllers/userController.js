const {User} = require('../models')
const Helper = require('../Helper/helper')
require('dotenv').config()
const jwt = require('jsonwebtoken')
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

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
      if(err.name === 'SequelizeValidationError'){
        next({
          name: 'Validation Error',
          status: 400,
          message: err.errors
        })
      }else next(err)
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
  static googleLogin(req,res, next){
    let payload
    client.verifyIdToken({
      idToken: req.body.googleToken,
      audience: process.env.GOOGLE_CLIENT_ID
    })
      .then(ticket =>{
        // console.log(ticket.getPayload());
        payload = ticket.getPayload()
        return User.findOne({
          where: { email: payload.email }
        })
      })
      .then(data =>{
        if(data) return data
        else{
          console.log(payload, '<<< dari then 1');
          return User.create({
            username: payload.name,
            email: payload.email,
            password: process.env.passwordUser
          })
        }
      })
      .then(data =>{
        console.log(data, '<<< dari then 2');
        const accessToken = jwt.sign({
          id: data.id,
          email: data.email
        }, process.env.SECRET)
        // const accessToken = Helper.generateToken({
        //   id: data.id,
        //   email: data.email
        // })
        res.status(200).json({accessToken})
      })
      .catch(err => next(err))
  }
}

module.exports = UserController
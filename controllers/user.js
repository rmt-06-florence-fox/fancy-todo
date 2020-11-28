const {User} = require('../models')
const helpbcrypt = require('../helpers/bcrypt')

const {generateToken} = require('../helpers/jwt')
const jwt = require('jsonwebtoken')
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);

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
        next(err)
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
          throw {
            status: 404,
            message: 'Data not found'
          }
          }
        
      })
      .catch (err=>{
        console.log(err)
        next(err)
      })

  }

  static googleLogin(req,res,next){
    // console.log('berhasil')
       client.verifyIdToken({
            google_token: req.body.google_token,
            audience: process.env.CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
            // Or, if multiple clients access the backend:
            //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
        })
        .then ((ticket)=>{
          payload = ticket.getPayload()
          User.findOne({ where: {email: payload.email}})
        })
          .then(user=>{
            if(user){
              return user
            }
            else {
               return User.create({
                email: payload.email,
                password: process.env.GOOGlE_PASSWORD
              })
            }
          })
          .then (user=>{
            const access_token = generateToken({id: user.id,email: user.email})
            res.status(200).json({access_token})
          })
        .catch(err=>{
          next(err)
        })
       

  }
}

module.exports = UserController
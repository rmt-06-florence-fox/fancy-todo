const {User} = require('../models')
const helpbcrypt = require('../helpers/bcrypt')
const {generateToken} = require('../helpers/jwt')
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);

class UserController {
  
  static register (req,res,next){
    console.log('masuk regist')
    const newUser = {
      namae: req.body.namae,
      email: req.body.email,
      password: req.body.password
    }
    User.create(newUser)
      .then (data=>{
        console.log(data)
        res.status(201).json({id: data.id,email: data.email})
      })
      .catch (err=>{
        console.log(err)
        next(err)
      })

  }

  static login(req,res){
    console.log('masuk login')
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
   let payload
       client.verifyIdToken({
        idToken: req.body.googleToken,
        audience: GOOGLE_PASSWORD,  // Specify the CLIENT_ID of the app that accesses the backend
            // Or, if multiple clients access the backend:
            //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
        })
        .then ((ticket)=>{
           payload = ticket.getPayload()
          const email = payload.email
            return User.findOne({ where: {email:email}})
        })
          .then(user=>{
            // console.log(user)
            if(user){
              return user
            }
            else {
              // console.log(ticket)
          
               return User.create({
                email: payload.email,
                password: process.env.GOOGLE_PASSWORD
              })
            }
          })
          .then (user=>{
            const access_token = generateToken({id: user.id,email: user.email})
            res.status(200).json({access_token})
          })
        .catch(err=>{
          console.log(err)
          next(err)
        })
       

  }
}

module.exports = UserController
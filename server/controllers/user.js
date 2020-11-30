const {User} = require('../models')
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);
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
      if(!user){
        throw{
          status:404,
          message: "User Not Found"
        }
      }else if(checkPassword(input.password,user.password)){
        const access_token= generateToken({id:user.id, email:user.email, name:user.name})
        res.status(200).json({access_token, name:user.name, email:user.email})
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
  static async gLogin(req, res, next) {
    try {
        const ticket = await client.verifyIdToken({
            idToken: req.body.google_token,
            audience: process.env.GOOGLE_CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
            // Or, if multiple clients access the backend:
            //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
        });

        const payload = ticket.getPayload()
        console.log(payload);
        const userlogin = await User.findOne({
            where: {
                email: payload.email
            }
        })
        console.log(payload);
        if (userlogin) {
            const access_token = generateToken({
              id:userlogin.id, 
              email:userlogin.email, 
              name:userlogin.name
            })
            res.status(200).json({access_token, email: userlogin.email, name:userlogin.name})
        } else {
            const createuser = await User.create({
                name: payload.name,
                email: payload.email,
                password: process.env.GOOGLE_PASSWORD
            })
            const access_token = generateToken({id:createuser.id, email:createuser.email})
            res.status(200).json({access_token})
        }
    } catch (error) {
        next(error)
    }
  }
}



module.exports= UserController

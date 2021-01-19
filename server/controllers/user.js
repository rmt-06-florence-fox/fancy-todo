const { User } = require('../models')
const { comparePassword, generateToken } = require('../helpers')
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT);

class UserController {
    static async register (req, res, next){
        const payload = {
            email: req.body.email,
            password: req.body.password
        }
        try {
            const dataUser = await User.create(payload)
            res.status(201).json({email: dataUser.email, id: dataUser.id})
            
        } catch (error) {   
            next(error)
            
        }

    } 
    static async login(req, res, next){

        try {
            const dataUser = await User.findOne({where: {email: req.body.email}})
            if(!dataUser){
                throw {
                    status: 400,
                    message: 'not found'
                }
            }
            else if (comparePassword(req.body.password, dataUser.password)){
                const access_token = generateToken({id: dataUser.id, email: dataUser.email})
                res.status(200).json({access_token})
            }
            else{
                throw {
                    status: 401,
                    message: 'invalid email/password'
                }
            }
            
        } catch(error){
            next(error)
        }
    }
    

  static googleLogin (req, res, next) {
    let payload;
    client.verifyIdToken({
        idToken: req.body.googleToken,
        audience: process.env.GOOGLE_CLIENT_ID
    })
    .then(ticket => {
      payload = ticket.getPayload()
        return User.findOne({ where: { email: payload.email }})
    })
    .then(user => {
      if (user) { 
            return user
        } else {
            return User.create({ email: payload.email, password: 'random' })
        }
    })
    .then(user => {
        const access_token = generateToken({ email:user.email, id: user.id })
        res.status(200).json({access_token})
    })
    .catch(error => {
        console.log(error)
        next(error)
    })
  }



}


module.exports = UserController
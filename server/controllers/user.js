const {User} = require("../models/")
const {comparePassword} = require('../helpers/bcrypt')
const {generateToken} = require('../helpers/jwt')
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

class UserController {
    static register(req, res, next) {
        const newUser = {
            email: req.body.email,
            password: req.body.password
        }
        User.create(newUser)
            .then(data => {
                if(!data || !data.email || !data.password) {
                    throw{
                        status: 400,
                        message: 'Semua Field Tidak Boleh Kosong'
                    }
                } else {
                    res.status(201).json({email: data.email, id: data.id})
                }
            })
            .catch(err => {
                next(err)
            })
    }

    static login(req, res, next) {
        User.findOne({
            where: {
                email: req.body.email
            }
        })
            .then(data => {
                if(!data) {
                    throw {
                        status: 400,
                        message: 'Invalid account'
                    }
                } else if(comparePassword(req.body.password, data.password)) {
                        const accesstoken = generateToken({id: data.id, email: data.email})
                        res.status(200).json({accesstoken})
                } else {
                    throw {
                        status: 400,
                        message: 'Invalid email/password'
                    }
                }
            })
            .catch(err => {
                next(err)
            })
    }

    static async googleLogin(req,res,next){
        try {
          const ticket = await client.verifyIdToken({
            idToken: req.body.googleToken,
            audience: process.env.GOOGLE_CLIENT_ID
          });
          const payload = ticket.getPayload();
          const findUser = await User.findOne({where: { email : payload.email}})
          if (findUser) {
            let obj = {
              id : findUser.id,
              email : findUser.email
            }
            const accesstoken = generateToken(obj)
            res.status(200).json({accesstoken})
          } else {
            let sign = {
              email : payload.email,
              password : process.env.GOOGLE_PASSWORD
            }
            const data = await User.create(sign)
            let obj = {
              id : data.id,
              email : data.email
            }
            
            const accesstoken = generateToken(obj)
            res.status(201).json({accesstoken})
          }
        } catch (error) {
            console.log('masuk catch');
          next(error)
        }
    }
}

module.exports = UserController
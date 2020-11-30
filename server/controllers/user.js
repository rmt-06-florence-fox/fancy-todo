const { User } = require('../models')
const Token = require('../helpers/jsonwebtoken')
const Password = require('../helpers/hash-password')
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

class UserController {

    // ? POST '/register'
    static async register(req, res, next) {
        const payload = {
            email: req.body.email,
            password: req.body.password
        }
        console.log(payload);
        
        try {
            const user = await User.create(payload)
            res.status(201).json({id: user.id, email: user.email})
        } catch (error) {
            next(error)
        }
    }

    // ? POST '/login'
    static async login(req, res, next) {
        const payload = {
            email: req.body.email,
            password: req.body.password
        }

        try {
            const user = await User.findOne({where : {
                email: payload.email
            }})
            if (!user) {
                throw {
                    status: 400,
                    message: 'wrong email / password'
                }
            } else {
                if (Password.comparePassword(payload.password, user.password)) {
                    const name = user.email.split("@")[0]
                    const access_token = Token.getToken({id:user.id, email:user.email})
                    res.status(200).json({access_token, name})
                } else {
                    throw {
                        status: 400,
                        message: 'wrong email / password'
                    }
                }
            }
        } catch (error) {
            next(error)
        }

    }

    static async googleLogin(req, res, next) {
        try {
            const ticket = await client.verifyIdToken({
                idToken: req.body.google_token,
                audience: process.env.GOOGLE_CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
                // Or, if multiple clients access the backend:
                //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
            });

            const payload = ticket.getPayload()
            const userlogin = await User.findOne({
                where: {
                    email: payload.email
                }
            })

            if (userlogin) {
                const access_token = Token.getToken({id:userlogin.id, email:userlogin.email})
                res.status(200).json({access_token, name: payload.name})
            } else {
                const createuser = await User.create({
                    email: payload.email,
                    password: process.env.GOOGLE_PASSWORD
                })
                const access_token = Token.getToken({id:createuser.id, email:createuser.email})
                res.status(200).json({access_token, name: payload.name})
            }
        } catch (error) {
            next(error)
        }
    }
}

module.exports = UserController
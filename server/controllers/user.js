const {User} = require('../models')
const {comparePassword} = require('../helpers/bcrypt')
const {generateToken} = require('../helpers/jwt')
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);


class UserController{
    static async register(req, res, next){
        try {
            let userObj = {
                email: req.body.email,
                password: req.body.password
            }
            const data = await User.create(userObj)
            res.status(201).json({email: data.email, id: data.id})

        } catch (error) {
            next(error)
        }
    }

    static async login(req, res, next){
        try {
            const data = await User.findOne({where: {email:req.body.email}})
            if (!data) {
                throw{
                    status: 400,
                    message: 'Invalid Account'
                }
            } else if(comparePassword(req.body.password, data.password)){
                const access_token = generateToken({id: data.id, email:data.email}, process.env.SECRET)
                res.status(200).json({access_token})
            } else {
                throw{
                    status: 400,
                    message: 'Invalid Email/Password'
                }
            }
        } catch (error) {
            next(error)
        }
    }

    static async googleLogin(req, res, next){
        try {
            const ticket = await client.verifyIdToken({
                idToken: req.body.googleToken,
                audience: process.env.GOOGLE_CLIENT_ID
            })
            console.log(ticket.getPayload());
            res.status(200).json('ok')

        } catch (error) {
            res.status(500).json(error)
        }
    }
}

module.exports = UserController
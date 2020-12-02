const {User} = require('../models')
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);
const {comparePassword} = require('../helper/bcrypt')
const {generateToken} =require('../helper/jwt')

class userController {
    static async register(req, res, next) {
        try {
            let newUser = {
                email : req.body.email,
                password : req.body.password
            }
            const data = await User.create(newUser)
            res.status(201).json({id : data.id, email : data.email})
        } catch (error) {
            next(error)
        }
    }

    static async login(req, res, next) {
        try {
            const data = await User.findOne({
                where : {
                    email : req.body.email
                }
            })
            if (!data) {
                throw({
                    status: 401,
                    message: "Invalid email/password"
                  })
            } else if (comparePassword(req.body.password, data.password)) {
                const access_token = generateToken({id: data.id, email: data.email})
                res.status(200).json({access_token})
            } else {
                throw({
                    status: 401,
                    message: "Invalid email/password"
                  })
            }
        } catch (error) {
            next(error)
        }
    }

    static async googleLogin(req,res, next) {
    try {
        const ticket = await client.verifyIdToken({
            idToken: req.body.googleToken,
            audience: process.env.CLIENT_ID
        });
        const payload = ticket.getPayload()
        const user = await User.findOne({
            where: {
                email: payload.email
            }
        })
        if(user)  {
            await user
        } else {
            user = await User.create({
                email: payload.email,
                password: process.env.GOOGLE_SECRETKEY
            })
        }
        const access_token = generateToken({id: user.id, email:user.email}, process.env.SECRET)
        res.status(200).json({access_token})
    } catch (error) {
        next(error)
    }
        
    }
}

module.exports = userController
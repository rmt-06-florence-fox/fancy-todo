const Bcrypt = require('../helpers/bcryptjs');
const { generateToken } = require('../helpers/jwt');
const {User} = require('../models/index')
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.GOOGLECLIENTID);

class UserController{
    static async signup(req, res, next){
        let newUser = {
            email: req.body.email,
            password: req.body.password
        }
        try {
            const data = await User.create(newUser)
            let dataShow = { id : data.id, email : data.email}
            res.status(201).json(dataShow)
        } catch (err) {
            next(err)
        }
    }

    static async signin(req, res, next){
        let dataLogin = {
            email : req.body.email,
            password : req.body.password
        }
        try {
            const data = await User.findOne({where : {email : dataLogin.email}})
            const accessToken = await generateToken({id : data.id, email : data.email})
            res.status(200).json({accessToken})
        } catch (err) {
            next(err)
        }
    }

    static async google(req, res, next) {
        try {
            const ticket = await client.verifyIdToken({
                idToken: req.body.tokenGoogle,
                audience: process.env.GOOGLECLIENTID,
            });
            const payload = ticket.getPayload();
            const findUser = await User.findOne({where :
                {email : payload.email}
            })
            if(findUser){
                let accessToken =  generateToken({id : findUser.id, email : findUser.email})
                res.status(200).json({accessToken})
            } else {
                const newUser = await User.create({
                    email : payload.email,
                    password : process.env.passwordGoogle
                })
                let dataShow = { id : newUser.id, email : newUser.email}
                let accessToken = generateToken(dataShow)
                res.status(201).json({accessToken})
            }
        } catch (err) {
            next(err)
        }
    }
}

module.exports = UserController
const { User } = require('../models/index')
const { comparePassword } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')
const {OAuth2Client} = require('google-auth-library');

class UserController{
    static async postRegister(req,res,next){
        let obj = {
            email: req.body.email,
            password: req.body.password
        }
        try {
            let newUser = await User.create(obj)
            res.status(201).json(newUser)
        } catch (err) {
            next(err)
        }
    }
    static async postLogin(req,res,next){
        let obj = {
            email: req.body.email,
            password: req.body.password
        }
        console.log(obj);
        try {
            let data = await User.findOne({
                where:{
                    email: obj.email
                }
            })
            if(data){
                if(comparePassword(obj.password,data.password)){
                    let token = generateToken({
                        id: data.id,
                        email: data.email
                    })
                    res.status(200).json({token})
                }else{
                    throw{
                        status:400,
                        msg:'email/password incorrect'
                    }
                }
            }else{
                throw{
                    status:400,
                    msg:'email/password incorrect'
                }
            }
        } catch (err) {
            next(err)
        }
    }
    static async postGoogleLogin(req,res,next){
        const client = new OAuth2Client(process.env.CLIENT_ID);
        try {
            const ticket = await client.verifyIdToken({
                idToken: req.body.token,
                audience: process.env.CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
                // Or, if multiple clients access the backend:
                //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
            });
            let payload = ticket.getPayload()
            let isRegistered = await User.findOne({
                where:{
                    email: payload.email
                }
            })
            if(isRegistered){
                let token = generateToken({id: isRegistered.id , email: isRegistered.email})
                console.log('login');
                res.status(200).json({token})
            }else{
                console.log('register');
                let newUser = await User.create({
                    email: payload.email,
                    password: process.env.GOOGLE_PASSWORD
                })
                let token = generateToken({id: newUser.id , email: newUser.email})
                res.status(200).json({token})
            }
        } catch (err) {
            next(err)
        }
    }
}

module.exports = UserController
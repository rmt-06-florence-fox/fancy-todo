const {User} = require('../models/index.js')
const {comparePassword} = require('../helper/encryption.js')
const {getToken} = require('../helper/jwt.js')
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.google_oauth)


class UserController {

    static async registerUser(req,res,next){
        const newUser  = {
            name : req.body.name,
            email : req.body.email,
            password : req.body.password
        }
        console.log('===========Get new User Data=========')
        console.log(req.body)
        console.log(newUser)
        try {
            console.log('==============Try Create New User===========')
            const regUser = await User.create( newUser )
            console.log('==============Succes Create New User===========')
            console.log(regUser)
            res.status(201).json(regUser)
        } catch (error) {
            next(error)
        }
    }

    static async signInUser(req,res,next){
        const email = req.body.email
        const password = req.body.password
        console.log('=========== Get User Sign In Data=================')
        console.log(req.body)
        console.log(email,password,email)

        try {
            console.log('=======Try to find One===========')
            const user = await User.findOne({
                where: {
                    email
                }
            })
            console.log('========Success to find one=================')
            console.log(user)

            if(!user){
                throw {
                    status : 400,
                    message : 'Invalid email/password'
                }
                // throw 'Invalid email/password'
            }else if(comparePassword(password,user.password)){
                console.log('===========Correct Pass==========')
                const access_token = getToken({ id : user.id , email:user.email })
                console.log(access_token)
                res.status(200).json(access_token)
            }else {
                throw {
                    status : 400,
                    message : 'Invalid email/password'
                }
                // throw 'Invalid email/password'
            }
        } catch (error) {
            next(error)
            // res.status(400).json({error})
        }
    }

    static async googleLogin(req,res,next){
        try {
            const ticket = await client.verifyIdToken({
                idToken: req.body.google_token,
                audience: process.env.google_oauth
            });
            const payload = ticket.getPayload();
            const user = await User.findOne( {
                where : {
                    email : payload.email
                }
            })

            if(user){
                const access_token = getToken({ id : user.id , email:user.email })
                console.log(user)
                console.log('============Get Token Google User ===========')
                console.log(access_token)
                res.status(200).json(access_token)
            }else {
                const newUser = {
                    name : payload.name,
                    email : payload.email,
                    password : process.env.google_password
                }
                const createUSer = await User.create(newUser)
                console.log(createUSer)
                const access_token = getToken({ id : createUSer.id , email:createUSer.email })
                console.log('============Create Token Google User ===========')
                console.log(access_token)
                res.status(200).json(access_token)
            }
        } catch (error) {
            next(error)
        } 

        
    }
}


module.exports = UserController
const { User } = require('../models')
const { comparePassword, generateToken } = require('../helpers')

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
        client.verifyIdToken({
            idToken: req.body.googleToken,
            audience: process.env.GOOGLE_CLIENT_ID
        })
        .then(ticket => {
            console.log(ticket.getPayload)
            res.status(200).json('ok')
        })
        .catch(error => {
            next(error)
        })
    }


}


module.exports = UserController
const { User } = require('../models/index')
const { comparePassword } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')

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
                    status:404,
                    msg:'error not found'
                }
            }
        } catch (err) {
            next(err)
        }
    }
}

module.exports = UserController
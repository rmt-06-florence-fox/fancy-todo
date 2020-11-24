const { User } = require('../models/index')
const { comparePassword } = require('../helpers/bcrypt')
const { generateToken } = require('../helpers/jwt')

class UserController{
    static async postRegister(req,res){
        let obj = {
            email: req.body.email,
            password: req.body.password
        }
        try {
            let newUser = await User.create(obj)
            res.status(201).json(newUser)
        } catch (err) {
            if(err.name == 'SequelizeValidationError'){
                res.status(400).json(err.errors)
            }else{
                res.status(500).json({msg: 'internal server error'})
            }
        }
    }
    static async postLogin(req,res){
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
                    res.status(200).json(token)
                }else{
                    res.status(400).json({msg: 'email/password incorrect'})
                }
            }else{
                res.status(404).json({msg: 'error not found'})
            }
        } catch (err) {
            res.status(500).json({msg: 'internal server error'})
        }
    }
}

module.exports = UserController
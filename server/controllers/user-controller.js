const {User} = require('../models/')
const Helper = require('../helper')
const jwt = require('jsonwebtoken')

class UserController {
    
    static getRegisterForm(req, res){
        res.status(200).json({message : 'go to registration form'})
    }

    static async register(req, res){
        let {fullName, userName, email, password} = req.body
        let data = { fullName, userName, email, password }
        //console.log(data)
        try {
            await User.create(data) 
            res.status(201).json(data)
            
        } catch (error) {
            if (error.name === "SequelizeValidationError" || error.name === "SequelizeUniqueConstraintError"){
                //console.log(';masuk validasi')
                let message = error.errors.map(e => {
                    return e.message
                })
                res.status(400).json({error : message})

            } else {

                res.status(400).json({error : error.message})
            }
            
        }
    }

    static getLoginForm(req, res){
        res.status(200).json({message : 'go to login form'})

    }

    static async login(req, res){
        let {email, password} = req.body
        
        //console.log(req.body)
        try {
            let data = await User.findOne({
                where : {
                    email
                }
            })
            if (data){
                //res.status(200).json(data)
                if (Helper.checkPassword(password, data.password)){
                    const token = jwt.sign({
                        id : data.id,
                        userName : data.userName,
                        email : data.email
                    }, )  

                } else {
                    throw new Error('cannot find email or password')

                }

            } else {
                throw new Error ('cannot find email or password')

            }
        } catch (err) {
            res.status(201).json({error : err.message})
        }
    }

    
}

module.exports = UserController


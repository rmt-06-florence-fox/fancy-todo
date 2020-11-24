const {User} = require("../models/index")
const bcrypt = require('bcryptjs')
const Helper = require("../middlewares/helpers")
const jwt = require('jsonwebtoken')
require('dotenv').config()

class UserController{
    static register(req, res, next){
        const obj = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: req.body.password
        }
        console.log(obj)
        User.create(obj)
        .then(data=>{
            console.log(data)
            res.status(201).json({email: data.email, id: data.id})
        })
        .catch(e=>{
            next(e)
        })
    }

    static login(req, res, next){
        User.findOne({
            where:{
                email: req.body.email
            }
        })
        .then(data=>{
            console.log(data, req.body.password, data.password)
            if(!data){
                res.status(401).json({message: `invalid account`})
            } else if (bcrypt.compareSync(req.body.password, data.password)){
                // const access_token = jwt.sign({id: data.id, email:data.email}, process.env.SECRET)
                const access_token = Helper.generateToken({id: data.id, email:data.email})
                res.status(200).json({access_token})
            } else {
                res.status(401).json({message: `invalid email/password`})
            }
            }
        )
        .catch(e=>{
            next(e)
        })
    }
}

module.exports = UserController
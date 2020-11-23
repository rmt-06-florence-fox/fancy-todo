const {User} = require("../models/index")
const {bcrypt} = require('bcryptjs')
const {jwt} = require('jsonwebtoken')

class UserController{
    static register(req, res){
        let obj = {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: req.body.password
        }
        console.log(obj)
        User.create(obj)
        .then(data=>{
            console.log(data)
            res.status(201).json({first_name: data.first_name, last_name: data.last_name, email: data.email})
        })
        .catch(e=>{
            res.status(500).json({message: `internal server error`})
        })
    }



    static login(req, res){
        User.findOne({
            where:{
                email: req.body.email
            }
        })
        .then(data=>{
            if(!data){
                res.status(401).json({message: `invalid account`})
            } else if (bcrypt.compareSync(req.body.password, data.password)){
                const access_token = jwt.sign({id: data.id, email:data.email}, 'thisIsSecret')
                res.status(200).json({access_token})
            } else {
                res.status(401).json({message: `invalid email/password`})
            }
            }
        )
        .catch(e=>{
            res.status(500).json({message: `internal server error`})
        })
    }
}

module.exports = UserController
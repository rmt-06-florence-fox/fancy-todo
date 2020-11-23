const {Todo, User} = require('../models/index')
const Bcrypt = require('../helper/bcrypt')
const jwt = require('jsonwebtoken');
class UserController{
    static register(req, res){
        const obj = {
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            createdAt: new Date(),
            updatedAt: new Date()
        }
        User.create(obj)
        .then(value => {
            res.status(200).json({name: value.name, email: value.email})
        })
        .catch(error => {
            console.log(error);
            res.status(500).json(`oopss sorry, it seems any error`)
        })
    }
    static login(req, res){
        const email = req.body.email
        const password = req.body.password
        User.findOne({where:{
            email: email
        }})
        .then(value => {
            if (!value) {
                res.status(401).json(`invalid account`)
            }else if(Bcrypt.compare(password, value.password)){
                const token = jwt.sign({id: value.id, email:value.email}, process.env.secret)
                res.status(200).json(token)
            }else{
                res.status(401).json(`email or password invalid`)
            }
        })
        .catch(error => {
            res.status(500).json(`oops sorry, it seems any error`)
        })
    }
}

module.exports = UserController
const { Todo,User } = require('../models')
const { compare } = require('../helper/bcrypt')

class Controller {
    static home(req,res){
        res.send("hello")
    }

    static register(req,res){
        const obj = {
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            email: req.body.email,
            password: req.body.password
        }
        User.create(obj)
        .then(data => {
            res.status(201).json({
                firstname: data.firstname,
                lastname: data.lastname,
                email: data.email,
                password: data.password
            })
        })
        .catch(error => {
            res.status(500).json({message: "internal server error"})
        })
    }

    static login(req,res){
        User.findOne({where: {email: req.body.email}})
        .then(data => {
            if (data){
                if(compare(req.body.password,data.password)){
                    res.status(200).json({
                    firstname: data.firstname,
                    lastname: data.lastname,
                    email: data.email,
                    password: req.body.password
                    })
                } else {
                    res.status(500).json({message: "email/password salah"})
                } 
            } else {
                res.status(500).json({message: "email/password salah"})
            }
        })
        .catch(error => {
            res.status(500).json({message: "email/password salah"})
        })
    }

    static listTodos(req,res) {
        res.send("hello")
    }
}

module.exports = Controller
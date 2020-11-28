const { Todo,User } = require('../models')
const { compare } = require('../helper/bcrypt')
const jwt = require('jsonwebtoken')
const { generateToken,verifyToken } = require('../helper/jwt')


class ControllerUser {

    static home(req,res){
        res.send("hello")
    }

    static register(req,res,next){
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
            next(error)
        })
    }

    static login(req,res,next){
        User.findOne({where: {email: req.body.email}})
        .then(data => {
            if (data){
                if(compare(req.body.password,data.password)){
                    // res.status(200).json({
                    // id: data.id,
                    // firstname: data.firstname,
                    // lastname: data.lastname,
                    // email: data.email,
                    // password: req.body.password
                    // })
                    const access_token = generateToken({id: data.id, email:data.email})
                    res.status(200).json({ access_token })
                } else {
                    throw {
                        status: 404,
                        message: "email/password salah"
                    }
                    
                } 
            } else {
                throw {
                    status: 404,
                    message: "email/password salah"
                }
            }
        })
        .catch(error => {
            console.log(error)
            next(error)
        })
    }

    static createTodo(req,res,next) {
        const obj = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date,
            createdAt: new Date(),
            updatedAt: new Date()
        }
        Todo.create(obj)
        .then( data => {
            res.status(201).json({
                title: data.title,
                description: data.description,
                status: data.status,
                due_date: data.due_date
            })
        })
        .catch(error => {
            next(error)
        })
    }
}

module.exports = ControllerUser
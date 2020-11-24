const { Todo,User } = require('../models')
const { compare } = require('../helper/bcrypt')

class ControllerUser {

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
            const err = []
            for (let i = 0 ; i < error.errors.length; i++){
                err.push(error.errors[i].message)
            }
            console.log(err)
            res.status(500).json({message: err})
        })
    }

    static login(req,res){
        User.findOne({where: {email: req.body.email}})
        .then(data => {
            if (data){
                if(compare(req.body.password,data.password)){
                    res.status(200).json({
                    id: data.id,
                    firstname: data.firstname,
                    lastname: data.lastname,
                    email: data.email,
                    password: req.body.password
                    })
                    const access_token = jwt.sign({id: data.id, email:data.email}, process.env.SECRET)
                } else {
                    res.status(404).json({message: "email/password salah"})
                } 
            } else {
                res.status(404).json({message: "email/password salah"})
            }
        })
        .catch(error => {
            res.status(500).json({message: "internal server error"})
        })
    }

    static createTodo(req,res) {
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
            res.status(500).json({message: "internal server error"})
        })
    }
}

module.exports = ControllerUser
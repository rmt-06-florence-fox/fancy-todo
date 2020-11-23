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

    static listTodo(req,res){
        Todo.findAll()
        .then(data => {
            res.status(200).json(data)
        })
        .catch(error => {
            res.status(500).json({message: "internal server error"})
        })
    }

    static findTodoById(req,res){
        Todo.findOne({where: {id: req.params.id}})
        .then(data => {
            if (data){
                res.status(200).json({
                    title: data.title,
                    description: data.description,
                    status: data.status,
                    due_date: data.due_date
                })
            } else {
                res.status(404).json({message: "id not found!"})
            }
        })
        .catch(error => {
            res.status(500).json({message: "internal server error"})
        })
    }

    static updateTodo(req,res){
        Todo.update({
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date
        },{where: {id: req.params.id}})
        .then(data => {
            res.status(200).json({
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

    static updateStatusTodo(req,res){
        Todo.update({
            status: req.body.status,
        },{where: {id: req.params.id}})
        .then(data => {
            if (data){
                res.status(200).json({
                    title: data.title,
                    description: data.description,
                    status: data.status,
                    due_date: data.due_date
                })
            }else {
                res.status(404).json({message: "id not found!"})
            }
        })
        .catch(error => {
            res.status(500).json({message: 'internal server error'})
        })
    }

    static deleteTodo(req,res){
        Todo.destroy({where: {id: req.params.id}})
        .then( data => {
            if (data){
                res.status(200).json({message: 'todo success to delete'})
            } else {
                res.status(404).json({message: 'id not found!'})
            }
        })
        .catch( error => {
            res.status(500).json({message: 'internal server error'})
        })
    }
}

module.exports = Controller
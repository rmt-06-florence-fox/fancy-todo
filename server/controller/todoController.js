
const { Todo } = require("../models/index")

class TodoController {
    static add (req,res, next) {
        const { title, description, status, due_date } = req.body
        const UserId = req.loggedInUser.id
        Todo.create({title, description, status, due_date, UserId}, {returning: true})
        .then(result => {
            res.status(201).json(result)
        })
        .catch(err => {
            next(err)
        })
    }
    static list (req,res, next) {
        const UserId = req.loggedInUser.id
        Todo.findAll({where: {UserId}})
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            next(err)
        })
    }
    static edit (req, res, next) {
        const { title, description, status, due_date } = req.body
        console.log(title, description, status, due_date)
        // console.log(req.body)
        Todo.update({
            title,
            description,
            status,
            due_date
        }, {
            where :{
                id: req.params.id
            }, returning: true
        })
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            console.log(err, "masuk ke error bro")
            next(err)
        })
    }
    static findOne(req, res, next){
        Todo.findOne({where :{id: req.params.id}}, {returning: true})
        .then(result => {
            res.status(200).json(result)
        })
        .catch(err => {
            next(err)
        })
    }
    static update(req, res, next){
        const { status } = req.body
        // console.log(req.body)
        Todo.update({
            status
        }, {
            where :{
                id: req.params.id
            }, returning: true
        })
        .then(data => {
            res.status(200).json(data)
        })
        .catch(err => {
            next(err)
        })
    }
    static delete(req,res, next){
        Todo.destroy({where:{id: req.params.id}})
        .then(() => {
            res.status(204).send("todo success to delete")
        })
        .catch(err => {
            next(err)
        })
    }
}

module.exports = TodoController
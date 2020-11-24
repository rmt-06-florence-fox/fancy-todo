const { Todo } = require('../models')

class TodoController {

    static addTask(req, res, next){
        const newTask = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date,
            UserId: req.loggedInUser.id
        }

        Todo.create(newTask)
        .then(data => {
            res.status(201).json(data)
        })
        .catch(error => {
            console.log(error)
            res.status(500).json({massage: 'internal server error'})
        })
    }

    static showAll(req, res, next){
        Todo.findAll({where: {UserId: req.loggedInUser.id}})
        .then(data => {
            res.status(200).json(data)
        })
        .catch(error => {
            res.status(500).json({massage: 'internal server error'})
        })
    }

    static showOne(req, res, next){
        const id = +req.params.id
        Todo.findByPk(id)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(error => {
            res.status(500).json({massage: 'internal server error'})
        })
    }

    static fullUpdate(req, res, next){
        const id = +req.params.id
        let UpdatedTask = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date,
            UserId: req.loggedInUser.id
        }

        Todo.update(UpdatedTask, {
            where: {
                id
            }
        })
        .then(data => {
            res.status(200).json(UpdatedTask)
        })
        .catch(error => {
            res.status(500).json({massage: 'internal server error'})
        })
    }

    static editTask(req, res, next) {
        const id = +req.params.id
        let updateStatus = {
            status: req.body.status
        }
        Todo.update(updateStatus, {
            where: {
                id
            }
        })
        .then(data => {
            res.status(200).json(updateStatus)
        })
        .catch(error => {
            res.status(500).json({massage: 'internal server error'})
        })
    }

    static delete(req, res, next){
        const id = +req.params.id
        Todo.destroy({
            where: {
                id
            }
        })
        .then(data => {
            res.status(200).json(data)
        })
        .catch(error => {
            res.status(500).json({massage: 'internal server error'})
        })
    }
}

module.exports = TodoController
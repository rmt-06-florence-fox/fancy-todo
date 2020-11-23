const { Todo } = require('../models')

class TodoController {

    static addTask(req, res){
        const newTask = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date
        }

        Todo.create(newTask)
        .then(data => {
            res.status(201).json(data)
        })
        .catch(error => {
            res.status(500).json({massage: 'internal server error'})
        })
    }

    static showAll(req, res){
        Todo.findAll()
        .then(data => {
            res.status(200).json(data)
        })
        .catch(error => {
            res.status(500).json({massage: 'internal server error'})
        })
    }

    static showOne(req, res){
        const id = +req.params.id
        Todo.findByPk(id)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(error => {
            res.status(500).json({massage: 'internal server error'})
        })
    }

    static fullUpdate(req, res){
        const id = +req.params.id
        let UpdatedTask = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date
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
}

module.exports = TodoController
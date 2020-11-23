const { Todo } = require('../models')

class TodoController {

    static showList(req, res){
        Todo.findAll()
        .then(data =>{
            res.status(200).json(data)
        })
        .catch(err =>{
            res.status(500).json(`Internal Server Error`)
        })
    }
    static addList(req, res){
        let newTodo = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            date: req.body.date
        }
        Todo.create(newTodo)
        .then(result =>{
            res.status(201).json(result)
        })
        .catch(err =>{
            if(err.message === 'due date must be greater than today dude !!'){
                res.status(400).json(err.message)
            } else {

                res.status(500).json(`Internal Server Error`)
            }
        })
    }

    static getList(req, res){
        let dataId = +req.params.id

        Todo.findByPk(dataId)
        .then(data =>{
            res.status(200).json(data)
        })
        .catch(err =>{
            res.status(404).json(err)
        })
    }

}


module.exports = TodoController
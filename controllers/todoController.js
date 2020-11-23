const { Todo } = require('../models/index')

class TodoController{
    static async postTodo(req,res){
        let obj = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date
        }
        try {
            let newTodo = await Todo.create(obj)
            res.status(201).json(newTodo)
        } catch (err) {
            if(err.name == 'SequelizeValidationError'){
                res.status(400).json({msg: err})
            }else{
                res.status(500).json({msg: 'Internal server error'})
            }
        }
    }
}


module.exports = TodoController
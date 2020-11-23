const { Todo } = require('../models/index')

class TodosController {

    static async getTodos(req,res){
        
        try {
            const data = await Todo.findAll()
            res.status(200).json(data)
        } catch (error) {
            res.status(404).json(error)
        }
    }

    static async createTodos(req, res){
        
        const newTodo = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date
        }

        try {
            const data = await Todo.create(newTodo)   
            res.status(201).json(data)
        } catch (error) {
            
            res.status(400).json(error)
        }
    }
}




module.exports = TodosController
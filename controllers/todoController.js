const { Todo } = require('../models')

class TodoController {
    static async inputTodo(req, res) {
        const todoObj = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date:req.body.due_date
        }
        try {
            const data = await Todo.create(todoObj)
            res.status(201).json({data})
        } catch (error) {
            res.status(400).json({error: error.message})
        }
    }
}

module.exports = TodoController
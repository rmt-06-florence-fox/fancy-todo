const { Todo } = require('../models/index')

class TodoController {
    static async getTodos(req, res) {
        try {
            const data = await Todo.findAll()
            res.status(200).json(data)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    static createTodo(req, res) {
        const payload = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date
        }

        Todo.create(payload)
            .then(data => {
                res.status(201).json(data)
            })
            .catch(err => {
                res.status(500).json(err)
            })
    }
}

module.exports = TodoController
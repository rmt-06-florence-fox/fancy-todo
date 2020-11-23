const {Todo} = require('../models');

class Controller {
    static async getTodos(req, res) {
        try {
            const todos = await Todo.findAll();
            res.status(200).json({todos});
        } catch (error) {
            res.status(500).json(error);
        }
    }
    static async postTodos(req, res) {
        const newInputTodo = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date
        }
        try {
            const newTodo = await Todo.create(newInputTodo);
            res.status(201).json(newTodo);
        } catch (error){
            res.status(500).json(error)
        }
    }
}

module.exports = Controller;
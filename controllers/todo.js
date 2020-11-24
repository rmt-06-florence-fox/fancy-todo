const { Todo } = require('../models/index')

class TodoController {
    static createTodo(req, res) {
        const payload = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date,
            UserId: req.loggedInUser.id
        }

        Todo.create(payload)
            .then(data => {
                res.status(201).json(data)
            })
            .catch(err => {
                if (err.name === 'SequelizeValidationError') {
                    res.status(400).json(err)
                } else {
                    res.status(500).json(err)
                }
            })
    }

    static async getTodos(req, res) {
        try {
            const data = await Todo.findAll({
                where: {
                    UserId: req.loggedInUser.id
                }
            })
            res.status(200).json(data)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    static async getTodoById(req, res) {
        const idTodo = +req.params.id
        try {
            const data = await Todo.findByPk(idTodo)
            if(data) {
                res.status(200).json(data)
            } else {
                res.status(404).json({message: `Data Not Found`})
            }
        } catch (error){
            res.status(500).json(error)
        }
    }

    static async updateTodo(req, res) {
        try {
            const idTodo = +req.params.id
            const payload = {
                title: req.body.title,
                description: req.body.description,
                status: req.body.status,
                due_date: req.body.due_date
            }
            const data = await Todo.findByPk(idTodo)
            if (!data) {
                res.status(404).json({message: 'Data Not Found'})
            } else {
                const todo = await Todo.update(payload, {
                    where: {
                        id: idTodo
                    },
                    returning: true
                })
                res.status(200).json(todo[1])
            }
        } catch (error) {
            if (error.name === 'SequelizeValidationError') {
                res.status(400).json(error)
            } else {
                res.status(500).json(error)
            }
        }
    }

    static async updateStatus(req, res) {
        try {
            const idTodo = +req.params.id
            const payload = {
                status: req.body.status
            }
            const todo = await Todo.update(payload, {
                where: {
                    id: idTodo
                },
                returning: true
            })
            res.status(200).json(todo[1][0])
        } catch (error) {
            res.status(500).json(error)
        }
    }

    static async deleteTodo(req, res) {
        try {
            const idTodo = +req.params.id
            const data = await Todo.findByPk(idTodo)
            if (!data) {
                res.status(404).json({message: 'Data Not Found'})
            } else {
                await Todo.destroy({
                    where : {
                        id: idTodo
                    }
                })
                res.status(200).json({message: 'todo success to delete'})
            }
        } catch (error) {
            res.status(500).json(error)
        }
    }
}

module.exports = TodoController
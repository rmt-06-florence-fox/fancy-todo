const { Todo } = require ("../models/index.js")

class TodoController {
    
    static async findTodos (req, res) {
        try {
            const todos = await Todo.findAll()
            res.status(200).json(todos)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    static async findTodoById (req, res) {
        try {
            let id = req.params.id
            const todos = await Todo.findOne ({where : {id}})
            if (todos === null) {
                throw error
            } else {
                res.status(200).json(todos)
            }
        } catch (error) {
            res.status(404).json({msg : error.name})
        }
    }

    static async addTodos (req, res) {
        try {
            let data = {
                title : req.body.title,
                description : req.body.description,
                status : req.body.status,
                due_date : req.body.due_date
            }
            const newTodo = await Todo.create(data)
            res.status(201).json(newTodo)
        } catch (error) {
            console.log (error)
            if (error.name === "SequelizeValidationError") {
                res.status(400).json({msg : error.name})
            } else {
                res.status(500).json({msg : error.name})
            }
        }
    }

    static async updateTodo (req, res) {
        try {
            let id = +req.params.id
            let data = {
                status : req.body.status
            }
            const updateTodo = await Todo.update(data, { 
                where : {id},
                returning: true
            })
            if (todos === null) {
                throw error
            } else {
                res.status(200).json(updateTodo[1][0])
            }
        } catch (error) {
            if (error.name === "SequelizeValidationError") {
                res.status(400).json({msg : error.name})
            } else if (error.name === "referenceError") {
                res.status(500).json({msg : error.name})
            } else {
                res.status(404).json({msg : error.name})
            }
        }
    }

    static async updateTodoo (req, res) {
        try {
            let id = +req.params.id
            let data = {
                title : req.body.title,
                description : req.body.description,
                status : req.body.status,
                due_date : req.body.due_date
            }
            const updateTodo = await Todo.update(data, { 
                where : {id},
                returning: true
            })
            if (todos.id == null) {
                throw error
            } else {
                res.status(200).json(updateTodo[1][0])
            }
        } catch (error) {
            if (error.name === "SequelizeValidationError") {
                res.status(400).json({msg : error.name})
            } else if (error.name === "referenceError") {
                res.status(500).json({msg : error.name})
            } else {
                res.status(404).json({msg : error.name})
            }
        }
    }

    static async removeTodo (req, res) {
        try {
            let id = req.params.id
            const todos = await Todo.destroy({
                where: {id}
            })
            if (todos[+id].id === undefined) {
                throw error
            } else {
                res.status(200).json({msg : `To do with id ${id} Success to delete`})
            }
        } catch (error) {
            if (error.name === "referenceError") {
                res.status(500).json({msg : error.name})
            } else {
                res.status(404).json({msg : error.name})
            }
        }
    }
}

module.exports = TodoController
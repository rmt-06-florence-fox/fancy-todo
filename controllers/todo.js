const {Todo} = require('../models')

class TodoController {

    // ? POST '/todos'
    static async inputTodo(req, res) {
        const payload = {
            title: req.body.title,
            description: req.body.description,
            due_date: new Date(req.body.due_date).toISOString().split('T')[0]
        }
        try {
            const todo = await Todo.create(payload)
            res.status(201).json({todo})
        } catch (error) {
            if (error.message == `Validation error: Validation isAfter on due_date failed`) {
                res.status(400).json({message: error.message})
            } else {
                res.status(500).json({message: `Internal Server Error`})
            }
        }
    }

    // ? GET '/todos'
    static async showTodo(req, res) {
        try {
            const todo = await Todo.findAll()
            res.status(200).json(todo)
        } catch (error) {
            res.status(500).json({message: `Internal Server Error`})
        }
    }

    // ? GET '/todos/:id'
    static async showById(req, res) {
        const id = +req.params.id

        try {
            const todo = await Todo.findByPk(id)
            if (!todo) {
                res.status(404).json({message: `Error Not Found`})
            } else {
                res.status(200).json(todo)
            }
        } catch (error) {
            res.status(500).json({message: `Internal Server Error`})
        }
    }

    // ? PUT '/todos/:id'
    static async editTodo(req, res) {
        const id = req.params.id
        const payload = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: new Date(req.body.due_date).toISOString().split('T')[0]
        }
        try {
            const todo = await Todo.update(payload, {where: {id}, returning: true, individualHooks: true})
            if (todo[0] == 0) {
                res.status(404).json({message: `Error Not Found`})
            } else {
                res.status(200).json(todo[1][0])
            }
        } catch (error) {
            console.log(error.name);
            if (error.message == `Validation error: Validation isAfter on due_date failed`) {
                res.status(400).json({message: error.message})
            } else {
                res.status(500).json({message: `Internal Server Error`})
            }
        }
    }

    // ? PATCH '/todos/:id'
    static async editStatusTodo(req, res) {
        const id = req.params.id
        const payload = {
            status: req.body.status
        }
        console.log(payload);
        try {
            const todo = await Todo.update(payload, {
                where: {id}, 
                returning: true
            })
            if (todo[0] == 0) {
                res.status(404).json({message: `Error Not Found`})
            } else {
                res.status(200).json(todo[1][0])
            }

        } catch (error) {
            console.log(error.message);
            if (error.message == `Validation error: Validation isAfter on due_date failed` || error.message == `Validation error: Validation isIn on status failed`) {
                res.status(400).json({message: error.message})
            } else {
                res.status(500).json({message: `Internal Server Error`})
            }
        }
    }

    // ? DELETE '/todos/:id'
    static async deleteTodo(req, res) {
        const id = +req.params.id

        try {
            const todo = await Todo.destroy({where: {id}})
            if (!todo) {
                res.status(404).json({message: `Error Not Found`})
            } else {
                res.status(200).json({message: `todo success to delete`})
            }
        } catch (error) {
            res.status(500).json({message: `Internal Server Error`})
        }
    }

}

module.exports = TodoController
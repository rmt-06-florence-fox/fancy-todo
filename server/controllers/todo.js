const {Todo} = require('../models')

class TodoController {

    // ? POST '/todos'
    static async inputTodo(req, res, next) {
        const payload = {
            title: req.body.title,
            description: req.body.description,
            due_date: new Date(req.body.due_date).toISOString().split('T')[0],
            UserId: req.loggedIn.id
        }
        try {
            const todo = await Todo.create(payload)
            res.status(201).json({todo})
        } catch (error) {
            next(error)
        }
    }

    // ? GET '/todos'
    static async showTodo(req, res, next) {
        try {
            const todo = await Todo.findAll({
                where: {
                    UserId: req.loggedIn.id
                }
            })
            res.status(200).json(todo)
        } catch (error) {
            next(error)
        }
    }

    // ? GET '/todos/:id'
    static async showById(req, res, next) {
        const id = +req.params.id

        try {
            const todo = await Todo.findOne({
                where: {
                    id: id
                }
            })

            res.status(200).json(todo)

        } catch (error) {
            next(error)
        }
    }

    // ? PUT '/todos/:id'
    static async editTodo(req, res, next) {
        const id = req.params.id
        const payload = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: new Date(req.body.due_date).toISOString().split('T')[0]
        }
        try {
            const todo = await Todo.update(payload, {
                where: {id}, 
                returning: true, 
                individualHooks: true
            })

            res.status(200).json(todo[1][0])
        } catch (error) {
            next(error)
        }
    }

    // ? PATCH '/todos/:id'
    static async editStatusTodo(req, res, next) {
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
            
            res.status(200).json(todo[1][0])
            
        } catch (error) {
            next(error)
        }
    }

    // ? DELETE '/todos/:id'
    static async deleteTodo(req, res, next) {
        const id = +req.params.id
        try {
            const todo = await Todo.destroy({where: {id}})
            
            res.status(200).json({message: `todo success to delete`})
            
        } catch (error) {
            next(error)
        }
    }

}

module.exports = TodoController
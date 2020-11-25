const { Todo } = require("../models")

class todoController {
    static async todoPost(req, res, next) { //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< static
        const UserId = req.loggedInUser.id
        const { title, description, status, due_date } = req.body
        const input = { title, description, status, due_date, UserId }
        try {
            const todo = await Todo.create(input)
            res.status(201).json({ todo })
        } catch (err) {
            next(err)
        }
    }
    static async todoGet(req, res, next) { //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< static
        try {
            const todo = await Todo.findAll({
                where: {
                    UserId: req.loggedInUser.id
                }
            })
            console.log(todo);
            res.status(200).json({ todo })
        } catch (err) {
            next(err)
        }
    }
    static async todoById(req, res, next) { //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< static
        try {
            const todo = await Todo.findOne({ 
                where: {
                    id: req.params.id,
                    UserId: req.loggedInUser.id
                } 
            })
            res.status(200).json(todo)
        } catch (err) {
            next(err)
        }
    }
    static async todoUpdatePut(req, res, next) {
        const id = req.params.id
        const { title, description, status, due_date } = req.body
        const input = { title, description, status, due_date }
        try {
            const todo = await Todo.update(input, { where: {id}, returning: true })
            res.status(200).json(todo[1][0])
        } catch (err) {
            next(err)
        }
    }
    static async todoUpdatePatch(req, res, next) {
        const id = req.params.id
        const input = { status: req.body.status }
        try {
            const todo = await Todo.update(input, { where: {id}, returning: true })
            res.status(200).json(todo[1][0])
        } catch (error) {
            next(err)
        }
    }
    static async todoDelete(req, res, next) {
        const id = req.params.id
        try {
            const todo = await Todo.destroy({ where: {id} })
            res.status(200).json({ message: `todo with id ${id} succes to delete`})
        } catch (error) {
            next(err)
        }
    }
}

module.exports = todoController
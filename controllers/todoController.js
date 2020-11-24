const { Todo } = require("../models")

class todoController {
    static async todoPost(req, res) { //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< static
        const UserId = req.loggedInUser.id
        const { title, description, status, due_date } = req.body
        const input = { title, description, status, due_date, UserId }
        try {
            const todo = await Todo.create(input)
            res.status(201).json({ todo })
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    }
    static async todoGet(req, res) { //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< static
        try {
            const todo = await Todo.findAll({
                where: {
                    UserId: req.loggedInUser.id
                }
            })
            console.log(todo);
            res.status(200).json({ todo })
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    }
    static async todoById(req, res) { //<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<< static
        try {
            const todo = await Todo.findOne({ 
                where: {
                    id: req.params.id,
                    UserId: req.loggedInUser.id
                } 
            })
            res.status(200).json(todo)
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    }
    static async todoUpdatePut(req, res) {
        const id = req.params.id
        const { title, description, status, due_date } = req.body
        const input = { title, description, status, due_date }
        try {
            const todo = await Todo.update(input, { where: {id}, returning: true })
            res.status(200).json(todo[1][0])
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }
    static async todoUpdatePatch(req, res) {
        const id = req.params.id
        const input = { status: req.body.status }
        try {
            const todo = await Todo.update(input, { where: {id}, returning: true })
            res.status(200).json(todo[1][0])
        } catch (error) {
            res.status(500).json({ error: error.message })
        }
    }
    static async todoDelete(req, res) {
        const id = req.params.id
        try {
            const todo = await Todo.destroy({ where: {id} })
            res.status(200).json({ message: `todo with id ${id} succes to delete`})
        } catch (error) {
            res.status(500).json({ error: error.message})
        }
    }
}

module.exports = todoController
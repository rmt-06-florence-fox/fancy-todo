const { Todo } = require('../models')

class TodoController {
    static async inputTodo(req, res) {
        try {
            const todoObj = {
                title: req.body.title,
                description: req.body.description,
                due_date: req.body.due_date,
                UserId: req.signInUser.id
            }
            const data = await Todo.create(todoObj)
            res.status(201).json(data)
        } catch (error) {
            if (error.name === "SequelizeValidationError") {
                res.status(400).json(error.message)
            } else {
                res.status(500).json({ message:"Internal Server Error"})
            }    
        }
    }

    static async showList(req, res) {
        try {
            const data = await Todo.findAll({
                where: {
                    UserId: req.signInUser.id
                }
            })
            res.status(200).json(data)
        } catch (error) {
            res.status(500).json({ message:"Internal Server Error"})
        }
    }

    static async getById(req, res) {
        try {
            const id = Number(req.params.id)
            const data = await Todo.findByPk(id)
            if(!data) {
                res.status(404).json({message: `Error Data Not Found`})
            } else {
                res.status(200).json({data})
            }
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    }

    static async updateTodo(req, res) {
        
        try {
            const id = Number(req.params.id)
            const todoObj = {
                title: req.body.title,
                description: req.body.description,
                status: req.body.status,
                due_date:req.body.due_date
            }
            const data = await Todo.update(todoObj, {where: {id}, returning: true})
            res.status(200).json(data[1][0])
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    }

    static async updateStatus(req, res) {
        try {
            const id = Number(req.params.id)
            const todoObj = {
            status: req.body.status
            }
            const data = await Todo.update(todoObj, {where: {id}, returning: true})
            res.status(200).json(data[1][0])
        } catch (error) {
            res.status(500).json({error: error.message})
        }
        
    }

    static async deleteTodo(req, res) {
        const id = Number(req.params.id)
        try {
            const data = await Todo.destroy({where: {id}, returning: true})
            res.status(200).json({message: `Todo Success to Delete`})
        } catch (error) {
            res.status(500).json({error: error.message})
        }
    }
}

module.exports = TodoController
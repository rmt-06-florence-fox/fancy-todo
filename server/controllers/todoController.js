const { Todo } = require('../models')

class TodoController {
    static async inputTodo(req, res, next) {
        try {
            const todoObj = {
                title: req.body.title,
                description: req.body.description,
                due_date: req.body.due_date,
                UserId: req.signInUser.id
            }
            const data = await Todo.create(todoObj)
            res.status(201).json(data)
        } catch (err) {
            next(err)
        }
    }

    static async showList(req, res, next) {
        try {
            const data = await Todo.findAll({
                where: {
                    UserId: req.signInUser.id
                }
            })
            res.status(200).json(data)
        } catch (err) {
            next(err)
        }
    }

    static async getById(req, res, next) {
        try {
            const id = Number(req.params.id)
            const data = await Todo.findByPk(id)
            res.status(200).json({data})        
        } catch (err) {
            next(err)
        }
    }

    static async updateTodo(req, res, next) {
        
        try {
            const id = Number(req.params.id)
            const todoObj = {
                title: req.body.title,
                description: req.body.description,
                status: req.body.status,
                due_date:req.body.due_date
            }
            const data = await Todo.update(todoObj, {
                where: {
                    id
                }, 
                returning: true
            })
            res.status(200).json(data[1][0])
        } catch (err) {
            next(err)
        }
    }

    static async updateStatus(req, res, next) {
        try {
            const id = Number(req.params.id)
            const todoObj = {
                status: req.body.status
            }
            const data = await Todo.update(todoObj, {
                where: {
                    id
                }, 
                returning: true
            })
            res.status(200).json(data[1][0])
        } catch (err) {
            next(err)
        }    
    }

    static async deleteTodo(req, res, next) {        
        try {
            const id = Number(req.params.id)
            const data = await Todo.destroy({
                where: {
                    id
                }
            })
            res.status(200).json({message: `Todo Success to Delete`})
        } catch (err) {
            next(err)
        }
    }
}

module.exports = TodoController
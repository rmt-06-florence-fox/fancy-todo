const e = require('express');
const { Todo } = require('../models')

class TodoController {
    static async createTodo (req, res, next) {
        const { title, description, status, due_date} = req.body
        const UserId = req.loggedInUser.id
        const payload = { title, description, status, due_date, UserId}

        try {
            const todo = await Todo.create(payload);
            res.status(201).json({todo});   
        }
        catch (error) {
            next(error)
        }
    }

    static async getTodo (req, res, next) {
        try {
            const todo = await Todo.findAll({
                where: {
                    UserId: req.loggedInUser.id
                }
            });
            res.status(200).json({todo});   
        }
        catch (error) {
            next(error)
        }
    }

    static async getOneTodo (req, res, next) {
        try {
            const id = +req.params.id
            const todo = await Todo.findByPk(id);
                res.status(200).json(todo)
        } catch (error) {
            next(error)
        }
    }

    static async editTodo (req, res, next) {
        try {
            const id = +req.params.id
            const { title, description, status, due_date} = req.body
            const payload = { title, description, status, due_date}
            const todo = await Todo.update(payload, {
                where: { id },
                returning: true
            });
            res.status(200).json(todo[1][0])            
        } catch (error) {
            next(error)
        }
    }

    static async updateTodoStatus (req, res, next) {
        try {
            const id = +req.params.id
            const payload = { status: req.body.status }
            const todo = await Todo.update(payload, {
                where: { id },
                returning: true
            });
            res.status(200).json(todo[1][0])            
        } catch (error) {
            next(error)
        }
    }

    static async deleteTodo (req, res, next) {
        try {
            const id = +req.params.id
            await Todo.destroy({
                where: { id },
            });
            res.status(200).json({message: 'todo succes to delete'})            
        } catch (error) {
            next(error)
        }
    }

}

module.exports = TodoController
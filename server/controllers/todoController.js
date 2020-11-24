const e = require('express');
const { Todo } = require('../models')

class TodoController {
    static async createTodo (req, res) {
        const { title, description, status, due_date} = req.body
        const UserId = req.loggedInUser.id
        const payload = { title, description, status, due_date, UserId}

        try {
            const todo = await Todo.create(payload);
            res.status(201).json({todo});   
        }
        catch (error) {
            if (error.name == "SequelizeValidationError") {
                res.status(400).json(error.errors[0].message);                
            } else {
                res.status(500).json({message: `Internal server error`})
            }
        }
    }

    static async getTodo (req, res) {
        try {
            const todo = await Todo.findAll({
                where: {
                    UserId: req.loggedInUser.id
                }
            });
            res.status(200).json({todo});   
        }
        catch (error) {
            res.status(500).json({message: `Internal server error`})
        }
    }

    static async getOneTodo (req, res) {
        try {
            const id = +req.params.id
            const todo = await Todo.findByPk(id);
                res.status(200).json(todo)
        } catch (error) {
            res.status(500).json({message: `Internal server error`})
        }
    }

    static async editTodo (req, res) {
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
            console.log(error)
            if (error.name == "SequelizeValidationError") {
                res.status(400).json(error.errors[0].message);                
            } else {
                res.status(500).json({message: `Internal server error`})
            }
        }
    }

    static async updateTodoStatus (req, res) {
        try {
            const id = +req.params.id
            const payload = { status: req.body.status }
            const todo = await Todo.update(payload, {
                where: { id },
                returning: true
            });
            res.status(200).json(todo[1][0])            
        } catch (error) {
            res.status(500).json({message: `Internal server error`})
        }
    }

    static async deleteTodo (req, res) {
        try {
            const id = +req.params.id
            await Todo.destroy({
                where: { id },
            });
            res.status(200).json({message: 'todo succes to delete'})            
        } catch (error) {
            res.status(500).json({message: `Internal server error`})
        }
    }

}

module.exports = TodoController
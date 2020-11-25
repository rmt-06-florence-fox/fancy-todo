const { Todo } = require('../models/index')
const axios = require('axios')

class TodoController {
    static createTodo(req, res, next) {
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
                next(err)
            })
    }

    static async getTodos(req, res, next) {
        try {
            const data = await Todo.findAll({
                where: {
                    UserId: req.loggedInUser.id
                }
            })
            res.status(200).json(data)
        } catch (err) {
            next(err)
        }
    }

    static async getTodoById(req, res, next) {
        const idTodo = +req.params.id
        try {
            const data = await Todo.findByPk(idTodo)
            if(data) {
                res.status(200).json(data)
            } else {
                res.status(404).json({message: `Data Not Found`})
            }
        } catch (err){
            next(err)
        }
    }

    static async updateTodo(req, res, next) {
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
                throw {
                    status: 404,
                    message: 'Data Not Found'
                }
            } else {
                const todo = await Todo.update(payload, {
                    where: {
                        id: idTodo
                    },
                    returning: true
                })
                res.status(200).json(todo[1])
            }
        } catch (err) {
            next(err)
        }
    }

    static async updateStatus(req, res, next) {
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
        } catch (err) {
            next(err)
        }
    }

    static async deleteTodo(req, res, next) {
        try {
            const idTodo = +req.params.id
            const data = await Todo.findByPk(idTodo)
            if (!data) {
                throw {
                    status: 404,
                    message: 'Data Not Found'
                }
            } else {
                await Todo.destroy({
                    where : {
                        id: idTodo
                    }
                })
                res.status(200).json({message: 'todo success to delete'})
            }
        } catch (err) {
            next(err)
        }
    }

    static async date(req, res, next) {
        try {
            axios({
                url: `https://calendarific.com/api/v2/holidays?&api_key=${process.env.CALENDARIFIC_SECRET}&country=ID&year=2020`,
                method: "GET"
            })
            res.status(200).json(response.data)
        } catch(err) {
            next(err)
        }
    }
}

module.exports = TodoController
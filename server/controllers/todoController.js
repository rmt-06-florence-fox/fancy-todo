const { Todo } = require ("../models/index.js")
const axios = require ('axios')

class TodoController {
    
    static async findTodos (req, res, next) {
        try {
            const todos = await Todo.findAll({
                where : {
                    UserId : req.dataUser.id
                }
            })
            res.status(200).json(todos)
        } catch (err) {
            next (err)
        }
    }

    static async findTodoById (req, res, next) {
        try {
            let id = req.params.id
            const todos = await Todo.findOne ({where : {id}})
            if (!todos) {
                throw {
                    status : 404,
                    msg : "To Do Not Found"
                }
            } else {
                res.status(200).json(todos)
            }
        } catch(err) {
            next(err)
        }
    }

    static async addTodos (req, res, next) {
        try {
            console.log (req.dataUser)
            let data = {
                title : req.body.title,
                description : req.body.description,
                status : req.body.status,
                due_date : req.body.due_date,
                UserId : req.dataUser.id
            }
            const newTodo = await Todo.create(data)
            res.status(201).json(newTodo)
        } catch(err) {
            console.log (err)
            next(err)
        }
    }

    static async updateTodo (req, res, next) {
        try {
            let id = +req.params.id
            let data = {
                status : req.body.status
            }
            const updateTodo = await Todo.update(data, { 
                where : {id},
                returning: true
            })
            if (!updateTodo) {
                throw {
                    status : 404,
                    msg : "To Do Not Found on your list"
                }
            } else {
                res.status(200).json(updateTodo[1][0])
            }
        } catch(err) {
            next(err)
        }
    }

    static async updateTodoo (req, res, next) {
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
            if (!updateTodo) {
                throw {
                    status : 404,
                    msg : "To Do Not Found on your list"
                }
            } else {
                res.status(200).json(updateTodo[1][0])
            }
        } catch(err) {
            next(err)
        }
    }

    static async removeTodo (req, res, next) {
        try {
            let id = req.params.id
            const result = await Todo.destroy({
                where: {id}
            })
            if (!result) {
                throw {
                    status : 404,
                    msg : "To Do Not Found on your list"
                }
            } else {
                res.status(200).json({msg : `To do with id ${id} Success to delete`})
            }
        } catch(err) {
            next(err)
        }
    }
}

module.exports = TodoController
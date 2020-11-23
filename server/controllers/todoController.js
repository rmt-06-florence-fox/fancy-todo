const { Todo } = require('../models')

class TodoController {
    static async findAll (req, res) {
        try {
            const todos = await Todo.findAll()
            if (todos.length <= 0) {
                res.status(200).json({message : 'you have not entered any todo'})
            }else {
                res.status(200).json(todos)
            }
        }
        catch (error) {
            console.log('kalo ini')
            res.status(500).json(error)
        }
    }

    static async addTodo (req, res) {
        try {
            const {title, description, due_date, status} = req.body
            const newTodo = await Todo.create({title, description, due_date, status})
            res.status(201).json(newTodo)
        }
        catch (error) {
            if(error.name === 'SequelizeValidationError') {
                res.status(400).json(error.errors[0].message)
            }
            else {
                res.status(500).json(error)
            }
        }
    }
    static async getTodo(req, res) {
        try {
            const id = req.params.id
            const todo = await Todo.findOne({
                where: {
                    id: id
                }
            })
            if(!todo) {
                res.status(404).json({message : 'Todo not found'})
            }
            else {
                res.status(200).json(todo)
            }
        }catch (error) {
            res.status(500).json(error)
        }
    }

    static async changeTodo(req, res) {
        try {
            const id = req.params.id
            const { title, description, status, due_date } = req.body
            const todo = await Todo.findByPk(id)
            if(!todo) {
               res.status(404).json({message: 'Todo not found'})
            }
            const change = await Todo.update({ title, description, status, due_date }, 
            {
                where: { id },
                returning: true
            })
            res.status(200).json(change[1][0])
        } catch (error) {
            if(error.name === 'SequelizeDatabaseError') {
                res.status(400).json({message: 'all columns must be fulfilled'})
            }
            else {
                res.status(500).json(error)
            }
        }
    }

    static async editStatus(req, res) {
        try {
            const id = req.params.id
            const { status } = req.body
            const todo = await Todo.findByPk(id)

            if(!todo) {
                throw {
                    message: 'Todo not Found'
                }
            }
            const patch = await Todo.update({
                status
            }, {
                where: {
                    id
                },
                returning: true
            })
            res.status(200).json(patch[1][0])
        }catch(error) {
            res.status(500).json(error)
        }
    }

    static async destroyTodo(req, res) {
        try {
            const id = req.params.id
            const todos = await Todo.findByPk(id)
            if(!todos) {
                throw {
                    message: 'Todo not found'
                }
            }
            const todo = await Todo.destroy({
                where: {
                    id
                }
            })
            res.status(200).json({message : 'deleted Todo success'})
        }catch (error) {
            res.status(500).json(error)
        }
    }
}

module.exports = TodoController
const {Todo} = require('../models')

class todosController {
    static async getTodo(req, res) {
        try {
            const data = await Todo.findAll({
                order: [['id', 'asc']]
            })
            res.status(200).json(data)
        } catch (error) {
            res.status(400).json(err)
        }
    }

    static async createTodo(req, res) {
        try {
            let newTodo = {
                title: req.body.title,
                description: req.body.description,
                status: req.body.status,
                due_date: req.body.due_date
            }
            const data = await Todo.create(newTodo)
            res.status(201).json(data)
        } catch (error) {
            res.status(400).json(error)
        }
    }

    static async findTodo(req, res) {

        try {
            let id = +req.params.id
            const data =  await Todo.findByPk(id)
            res.status(200).json(data)
        } catch (error) {
            res.status(404).json(error)
        }
    }

    static  async replaceTodo(req, res) {
        try {
            let id = +req.params.id
            let editedTodo = {
                title: req.body.title,
                description: req.body.description,
                status: req.body.status,
                due_date: req.body.due_date
            }
    
            const data = await Todo.update(editedTodo, {
                where : {
                    id
                },
                returning : true
            })
            res.status(200).json(data)
        } catch (err) {
            res.status(400).json(err)
        }
    }

    static async modifyTodo(req, res) {
        try {
            let id = +req.params.id
            let status = { status : req.body.status }

            const data = await Todo.update(status, {
                where : {
                    id
                },
                returning: true
            })
            res.status(200).json(data)
        } catch (error) {
            res.status(400).json(error)
        }
    }

    static async deleteTodo(req, res) {
        try {
            let id = +req.params.id
            const data = await Todo.destroy({
                where: {
                    id
                }
            })
            res.status(200).json('Todo success to delete')
        } catch (error) {
            res.status(400).json(error)
        }
    }
}

module.exports = todosController
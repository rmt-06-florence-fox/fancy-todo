const { Todo, User } = require('../models')
const { hash, compare } = require('../helpers/bcrypt-pass')
const jwt = require('jsonwebtoken')

class Controller {
    static async listTodos(req, res) {
        try {
            const data = await Todo.findAll()
            res.status(200).json(data)
        } catch (error) {
            res.status(500).json({message: 'Internal server error'})
        }
    }

    static async addTodos(req, res) {
        const obj = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date,
            UserId: req.body.UserId
        }
        try {
            if (new Date(obj.due_date) > new Date()) {
                const data = await Todo.create(obj)
                res.status(201).json(data)
            } else {
                res.status(400).json({message: 'Validation error'})
            }
        } catch (error) {
            res.status(500).json({message: 'Internal server error'})
        }
    }

    static async updateTodos(req, res) {
        const id = Number(req.params.id)
        const obj = {
            status: req.body.status
        }
        try {
            const data = await Todo.findByPk(id)
            if (data) {
                const dataUpdated = await Todo.update(obj, {where: {id: id}, returning: true})
                res.status(200).json(dataUpdated[1][0])
            } else {
                res.status(404).json({message: 'Error not found'})
            }
        } catch (error) {
            res.status(500).json({message: 'Internal server error'})
        }
    }

    static async addUser(req, res) {
        const obj = {
            name: req.body.name,
            username: req.body.username,
            password: req.body.password
        }
        try {
            const data = await User.create(obj)
            res.status(201).json(data)
        } catch (error) {
            res.status(500).json({message: 'Internal server error'})
        }
    }

    static async login(req, res) {
        try {
            const data = await User.findOne({where: {username: req.body.username}})
            if (!data) {
                res.status(404).json({message: 'Invalid account'})
            } else if (compare(req.body.password, data.password)) {
                const access_token = jwt.sign({id: data.id, username: data.username}, 'rahasiaya')
                res.status(200).json({access_token})
            } else {
                res.status(404).json({message: 'Invalid email/password'})
            }
        } catch (error) {
            res.status(500).json({message: 'Internal server error'})
        }
    }

    static async detailTodo(req, res) {
        const id = Number(req.params.id)
        try {
            const data = await Todo.findByPk(id, {include: User})
            if (!data) {
                res.status(404).json({message: 'Error not found'})
            } else {
                res.status(200).json(data)
            }
        } catch (error) {
            res.status(500).json({message: 'Internal server error'})
        }
    }

    static async editTodos(req, res) {
        const id = req.params.id
        const obj = {
            title: req.body.title,
            description: req.body.description,
            due_date: req.body.due_date,
            status: req.body.status
        }
        try {
            const data = await Todo.findByPk(id)
            if (data) {
                const dataEdited = await Todo.update(obj, {where: {id}, returning: true})
                if (!dataEdited) {
                    res.status(404).json({message: 'Validation Error'})
                } else {
                    res.status(200).json(dataEdited[1][0])
                }
            } else {
                res.status(404).json({message: 'Error not found'})
            }
        } catch (error) {
            res.status(500).json({message: 'Internal server error'})
        }
    }

    static async deleteTodo(req, res) {
        const id = Number(req.params.id)
        try {
            const data = await Todo.findByPk(id)
            if (data) {
                const dataDeleted = await Todo.destroy({where: {id}})
                res.status(200).json({message: 'todo success to delete'})
            } else {
                res.status(404).json({message: 'error not found'})
            }
        } catch (error) {
            res.status(500).json({message: 'Internal server error'})
        }
    }
}


module.exports = Controller
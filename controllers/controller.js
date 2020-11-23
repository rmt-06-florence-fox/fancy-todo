const { Todo, User } = require('../models')
const { hash, compare } = require('../helpers/bcrypt-pass')

class Controller {
    static async listTodos(req, res) {
        try {
            const data = await Todo.findAll()
            res.status(200).json(data)    
        } catch (error) {
            res.status(500).json(error)
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
            const data = await Todo.create(obj)
            res.status(201).json(data)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    static async updateTodos(req, res) {
        const id = Number(req.params.id)
        const obj = {
            status: req.body.status
        }
        try {
            const data = await Todo.update(obj, {where: {id: id}, returning: true})
            res.status(200).json(data[1][0])
        } catch (error) {
            res.status(500).json(error)
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
            res.status(500)
        }
    }

    static async login(req, res) {
        
    }
}


module.exports = Controller
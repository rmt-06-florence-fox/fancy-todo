const {Todo} = require('../models/index')
class Controller {
    static async createTodo (req, res) {
        let todo = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date
        }
        try {
            let data = await Todo.create(todo)
            res.status(201).json(data)
        } catch (error) {
            res.status(500).json(error)
        }
    }
    static async getTodo(req, res) {
        try {
            let data = await Todo.findAll()
            res.status(200).json(data)
        } catch (error) {
            res.status(500).json(error)            
        }
    }
    static async getTodoById(req, res){
        try {
            let id = req.params.id
            console.log(id)
            let data = await Todo.findByPk(id)
            console.log(data)
            res.status(200).json(data)
        } catch (error) {
            console.log(error)
            res.status(500).json(error)
        }
    }
    static async updateTodo(req, res){
        let id = req.params.id
        let obj = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date
        }
        try {
            let data = await Todo.update(obj, {
                where: {
                    id
                },
                returning: true,
            })
            res.status(200).json(data[1][0])
        } catch (error) {
            res.status(500).json(error)
        }
    }
    static async modifyStatusTodo(req, res){
        let id = req.params.id
        let newStatus = req.body.status
        try {
            let data = await Todo.update({status: newStatus}, {
                where: {
                    id
                },
                returning: true,
            })
            console.log(data[1])
            res.status(200).json(data[1][0])
        } catch (error) {
            res.status(500).json(error)
        }
    }
    static async destroyTodo(req, res) {
        let id = req.params.id
        try {
            let data = await Todo.destroy({
                where: {
                    id
                },
                returning: true
            })
            console.log(data)
            res.status(200).json(data[1][0])
            if(!data){
                res.status(404).json({message: `error not found`})
            }
        } catch (error) {
            res.status(500).json(error)
        }
    }
}

module.exports = Controller
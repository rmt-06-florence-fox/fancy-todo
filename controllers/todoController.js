const {Todo} = require('../models/index')
class Controller {
    static async createTodo (req, res) {
  
        try {
            let todo = {
                title: req.body.title,
                description: req.body.description,
                status: req.body.status,
                due_date: req.body.due_date
            }
            let currentDate = new Date()
            if(new Date(req.body.due_date) < currentDate){
                res.status(400).json({message: `tanggal tidak boleh diisi tanggal sebelumnya`})
            } else {
                let data = await Todo.create(todo)
                res.status(201).json(data)
            }
        } catch (error) {
            res.status(500).json({message: `internal server error`})
        }
    }
    static async getTodo(req, res) {
        try {
            let data = await Todo.findAll()
            res.status(200).json(data)
        } catch (error) {
            res.status(500).json({message: `internal server error`})            
        }
    }
    static async getTodoById(req, res){
        try {
            let id = req.params.id
            let data = await Todo.findByPk(id)
            console.log(data)
            if(!data){
                res.status(404).json({message:`error not found`})
            } else {
                res.status(200).json(data)
            }
        } catch (error) {
            res.status(500).json({message: `internal server error`})
        }
    }
    static async updateTodo(req, res){
        try {
            let id = req.params.id
            let obj = {
                title: req.body.title,
                description: req.body.description,
                status: req.body.status,
                due_date: req.body.due_date
            }
            let data = await Todo.update(obj, {
                where: {
                    id
                },
                returning: true,
            })
            if(!data[0]){
                res.status(404).json({message: `error not found`})
            } else {
                let currentDate = new Date()
                if(new Date(req.body.due_date) < currentDate){
                    res.status(400).json({message: `tanggal tidak boleh diisi tanggal sebelumnya`})
                } else {
                    res.status(200).json(data[1][0])
                }
            }
        } catch (error) {
            res.status(500).json({message: `internal server error`})
        }
    }
    static async modifyStatusTodo(req, res){
        try {
            let id = req.params.id
            let newStatus = req.body.status
            let data = await Todo.update({status: newStatus}, {
                where: {
                    id
                },
                returning: true,
            })
            if(!data[0]){
                res.status(404).json({message: `error not found`})
            } else {
                if(!newStatus){
                    res.status(400).json({message: `status tidak boleh kosong`})
                } else {
                    res.status(200).json(data[1][0])
                }
            }
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
            if(!data){
                res.status(404).json({message: `error not found`})
            } else {
                res.status(200).json(data[1][0])
            }
        } catch (error) {
            res.status(500).json(error)
        }
    }
}

module.exports = Controller
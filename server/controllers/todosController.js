const {Todo} = require('../models')

class todosController {
    static async getTodo(req, res) {
        try {
            const data = await Todo.findAll({
                order: [['id', 'asc']],
                where: {
                    UserId: req.loggedUser.id
                }
            })
            res.status(200).json(data)
        } catch (error) {
            res.status(500).json({"msg" : "Internal Server Error"})
        }
    }

    static async createTodo(req, res) {
        try {
            let newTodo = {
                title: req.body.title,
                description: req.body.description,
                status: req.body.status,
                due_date: req.body.due_date,
                UserId: req.loggedUser.id
            }
            const data = await Todo.create(newTodo)
            res.status(201).json(data)
        } catch (error) {
            if(error.name === 'SequelizeValidationError') {
                res.status(400).json(error.errors[0].message)
            }else {
                res.status(500).json({"msg" : "Internal Server Error"})
            }
        }
    }

    static async findTodo(req, res) {
        try {
            let id = +req.params.id
            const data =  await Todo.findByPk(id)
            
            if(!data) {
                res.status(404).json({"msg" : "Data not found!"})
            } else {
                res.status(200).json(data)
            }
        } catch (error) {
            res.status(500).json(error)
        }
    }

    static  async replaceTodo(req, res) {
        // res.status(200).json({msg: "update status"})
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
            if(!data[1].length) {
                res.status(404).json({"msg" : "Data not found!"})
            }else {
                res.status(200).json(data[1][0])
            }
        } catch (error) {
            if (error.name === 'SequelizeValidationError') {
                res.status(400).json(error.errors[0].message)
            } else {
                res.status(500).json({"msg" : "Internal Server Error"})
            }
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
            if(!data[1].length) {
                res.status(404).json({"msg" : "Data not found!"})
            } else {
                res.status(200).json(data[1][0])
            }
        } catch (error) {
            if (error.name === 'SequelizeValidationError') {
                res.status(400).json(error.errors[0].message)
            } else {
                res.status(500).json({"msg" : "Internal Server Error"})
            }
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
            if(!data) {
                res.status(404).json({"msg" : "Data not found!"})
            }else {
                res.status(200).json('Todo success to delete')
            }
        } catch (error) {
            res.status(500).json({"msg" : "Internal Server Error"})
        }
    }
}

module.exports = todosController
const {Todo} = require('../models')

class todosController {
    static async getTodo(req, res, next) {
        try {
            const data = await Todo.findAll({
                order: [['id', 'asc']],
                where: {
                    UserId: req.loggedUser.id
                }
            })
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }

    static async createTodo(req, res, next) {
        try {
            let newTodo = {
                title: req.body.title,
                description: req.body.description,
                status: req.body.status,
                due_date: req.body.due_date,
                UserId: req.loggedUser.id
            }
            const data = await Todo.create(newTodo)
            res.status(201).json({data})
        } catch (error) {
            next(error)
        }
    }

    static async findTodo(req, res, next) {
        try {
            let id = +req.params.id
            const data =  await Todo.findByPk(id)
            
            if(!data) {
                throw({status: 404,
                        message: "Data not found!"        
                })
            } else {
                res.status(200).json(data)
            }
        } catch (error) {
           next(error)
        }
    }

    static  async replaceTodo(req, res, next) {
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
                throw({status: 404,
                    message: "Data not found!"        
                })
            }else {
                res.status(200).json(data[1][0])
            }
        } catch (error) {
            // console.log(error);
                next(error)
        }
    }

    static async modifyTodo(req, res, next) {
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
                throw({status: 404,
                    message: "Data not found!"        
                })
            } else {
                res.status(200).json(data[1][0])
            }
        } catch (error) {
                next(error)
        }
    }

    static async deleteTodo(req, res, next) {
        try {
            let id = +req.params.id
            const data = await Todo.destroy({
                where: {
                    id
                }
            })
            if(!data) {
                throw({status: 404,
                    message: "Data not found!"        
                })
            }else {
                res.status(200).json({message: 'Todo success to delete'})
            }
        } catch (error) {
            next(error)
        }
    }
}

module.exports = todosController
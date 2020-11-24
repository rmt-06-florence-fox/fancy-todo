const { Todo } = require('../models')

class TodoController {

    static async create(req, res, next){
        try {
            let payload = {
                title: req.body.title,
                description: req.body.description,
                status: req.body.status,
                due_date: req.body.due_date,
                UserId: +req.loggedInUser.id
            }
            const data = await Todo.create(payload)
            res.status(201).json(data)
        } catch (error){
            next(error)
        }
    }
    
    static async getTodos(req, res, next){
        try {
            const data = await Todo.findAll({where:{UserId: +req.loggedInUser.id}});
            res.status(200).json(data)
        } catch (error){
            next(error)
        }
    }

    static async getById(req, res, next){
        try {
            let id = +req.params.id
            const data = await Todo.findByPk(id)
            if(data){
                res.status(200).json(data)
            } else {
                throw{
                    status: 404,
                    message: "Error Not Found"
                }
            }
        } catch (error) {
            next(error)
        }
    }

    static async update(req, res, next){
        try {
            let id = +req.params.id
            let payload = {
                title: req.body.title,
                description: req.body.description,
                status: req.body.status,
                due_date: req.body.due_date
            }
            const found = await Todo.findByPk(id)
            if(found){
                const data = await Todo.update(payload, {where: {id}, returning:true})
                res.status(200).json(data[1][0])
            } else {
                throw {
                    status: 404,
                    message: "Error Not Found"
                }
            } 
        } catch (error){
            next(error)
        }
    }

    static async updateStatus(req, res, next){
        try {
            let id = +req.params.id
            let payload = {
                status: req.body.status
            }
            const found = await Todo.findByPk(id)
            if(found){
                const data = await Todo.update(payload, {where: {id}, returning:true})
                res.status(200).json(data[1][0])
            } else {
                throw{
                    status: 404,
                    message: "Error Not Found"
                }
            } 
        } catch (error){
            next(error)
        }
    }

    static async del(req, res, next){
        try {
            let id = +req.params.id
            const found = await Todo.findByPk(id)
            if(found){
                const data = await Todo.destroy({where:{id}})
                res.status(200).json({message: 'todo success to delete'})
            } else {
                throw{
                    status: 404,
                    message: "Error Not Found"
                }
            }
        } catch (error){
            next(error)
        }
    }
}

module.exports = TodoController
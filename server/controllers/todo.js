const { Todo } = require('../models')
const axios = require('axios')
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
            res.status(200).json(data)
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
            const data = await Todo.update(payload, {where: {id}, returning:true})
            res.status(200).json(data[1][0])
            
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
            const data = await Todo.update(payload, {where: {id}, returning:true})
            res.status(200).json(data[1][0])
        } catch (error){
            next(error)
        }
    }

    static async del(req, res, next){
        try {
            let id = +req.params.id
            const data = await Todo.destroy({where:{id}})
            res.status(200).json({message: 'todo success to delete'})
        } catch (error){
            next(error)
        }
    }

    static async weather(req, res, next){
        try {
            const response = await axios({
                url: `https://api.weatherbit.io/v2.0/forecast/daily?&city=Jakarta&country=ID&key=${process.env.WEATHERBIT}`,
                method: "GET",
            })
            res.json(response.data)
        } catch (error) {
            next(error)
        }
    }
}

module.exports = TodoController
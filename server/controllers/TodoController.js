const { Todo, User, Holiday } = require('../models')
const axios = require('axios')

class TodoController {
    static async listTodos(req, res, next) {
        try {
            const data = await Todo.findAll({where: {UserId: req.loggedInUser.id}, order: [['status', 'DESC'], ['due_date', 'ASC'], ['title', 'ASC']]})
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }

    static async addTodos(req, res, next) {
        const obj = {
            title: req.body.title,
            description: req.body.description,
            due_date: req.body.due_date,
            UserId: req.loggedInUser.id
        }
        try {
            const data = await Todo.create(obj)
            res.status(201).json(data)
        } catch (error) {
            next(error)
        }
    }

    static async updateTodos(req, res, next) {
        const obj = {
            status: req.body.status
        }
        try {
            const data = await Todo.update(obj, {where: {id: req.params.id}, returning: true})
            res.status(200).json(data[1][0])
        } catch (error) {
            next(error)
        }
    }

    static async detailTodo(req, res, next) {
        try {
            const data = await Todo.findAll({where: {id: req.params.id}, include: User})
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }

    static async editTodos(req, res, next) {
        const obj = {
            title: req.body.title,
            description: req.body.description,
            due_date: req.body.due_date
        }
        try {
            const data = await Todo.update(obj, {where: {id: req.params.id}, returning: true})
            res.status(200).json(data[1][0])
        } catch (error) {
            next(error)
        }
    }

    static async deleteTodo(req, res, next) {
        try {
            const data = await Todo.destroy({where: {id: req.params.id}})
            res.status(200).json({message: ['todo success to delete']})
        } catch (error) {
            next(error)
        }
    }

    static holidays(req, res) {
        axios({
            url: `https://calendarific.com/api/v2/holidays?&api_key=${process.env.API_KEY}&country=ID&year=${new Date().getFullYear()}` ,
            method: 'GET'
        })
        .then(response => {
            let data = response.data.response.holidays
            let output = []
            for (let i = 0; i < data.length; i++) {
                if (data[i].date.datetime.month === new Date().getMonth()+1) {
                    output.push(data[i])
                }
            }
            res.status(200).json(output)
        })
        .catch(err => {
            next(err)
        })
    }
}


module.exports = TodoController
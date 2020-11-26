const { Todo, User } = require('../models')
const { hash, compare } = require('../helpers/bcrypt-pass')
const { getToken } = require('../helpers/jwt-token')
const { default: Axios } = require('axios')
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client('646065724082-konqgb2eatjlsvph04b3qkt6tg7hs3u0.apps.googleusercontent.com');

class Controller {
    static async listTodos(req, res, next) {
        try {
            const data = await Todo.findAll({where: {UserId: req.loggedInUser.id}})
            res.status(200).json(data)
        } catch (error) {
            next({
                status: 500,
                message: 'Internal Server Error'
            })
        }
    }

    static async addTodos(req, res, next) {
        const obj = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date,
            UserId: req.loggedInUser.id
        }
        try {
            const data = await Todo.create(obj)
            res.status(201).json(data)
        } catch (error) {
            console.log(error)
            next(error)
        }
    }

    static async updateTodos(req, res, next) {
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
                throw{
                    status: 404,
                    message: 'Data not found'
                }
            }
        } catch (error) {
            next(error)
        }
    }

    static async addUser(req, res, next) {
        const obj = {
            name: req.body.name,
            username: req.body.username,
            password: req.body.password
        }
        try {
            const data = await User.create(obj)
            res.status(201).json(data)
        } catch (error) {
            if (error.message === 'Validation error') {
                next({
                    status: 400,
                    message: 'Username is already exist!!'
                })
            } else {
                next(error)
            }
        }
    }

    static async login(req, res, next) {
        try {
            const data = await User.findOne({where: {username: req.body.username}})
            if (!data) {
                throw {
                    status: 401,
                    message: 'Invalid Account'
                }
            } else if (compare(req.body.password, data.password)) {
                const access_token = getToken(data)
                // res.status(200).json({message: 'Login Success!!'})
                res.status(200).json({access_token})
            } else {
                throw {
                    status: 401,
                    message: 'Username / Password is incorrect'
                }
            }
        } catch (error) {
            next(error)
        }
    }

    static async detailTodo(req, res, next) {
        const id = Number(req.params.id)
        try {
            const data = await Todo.findByPk(id, {include: User})
            if (!data) {
                throw{
                    status: 404,
                    message: 'Data not found'
                }
            } else {
                res.status(200).json(data)
            }
        } catch (error) {
            next(error)
        }
    }

    static async editTodos(req, res, next) {
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
                    throw{
                        status: 404,
                        message: 'Data not found'    
                    }
                } else {
                    res.status(200).json(dataEdited[1][0])
                }
            } else {
                throw{
                    status: 404,
                    message: 'Data not found'
                }
            }
        } catch (error) {
            next(error)
        }
    }

    static async deleteTodo(req, res, next) {
        const id = Number(req.params.id)
        try {
            const data = await Todo.findByPk(id)
            if (data) {
                const dataDeleted = await Todo.destroy({where: {id}})
                res.status(200).json({message: 'todo success to delete'})
            } else {
                throw{
                    status: 404,
                    message: 'Data not found'
                }
            }
        } catch (error) {
            next(error)
        }
    }

    static holidays(req, res) {
        Axios({
            url: `https://calendarific.com/api/v2/holidays?&api_key=${process.env.API_KEY}&country=ID&year=2020` ,
            method: 'GET'
        })
        .then(response => {
            res.status(200).json(response.data)
        })
        .catch(err => {
            next({
                status: 500,
                message: 'Invalid Server Error'
            })
        })
    }
}


module.exports = Controller
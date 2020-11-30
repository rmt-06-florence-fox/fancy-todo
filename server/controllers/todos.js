const { Todo } = require('../models/index')
const axios = require('axios')

class TodosController {
    static async getTodos(req,res,next){
        
        try {
            const data = await Todo.findAll({
                order: [['id','ASC']],
                where: {
                    UserId: req.loggedInUser.id
                }
            })
            res.status(200).json(data)
        } catch (error) {
            next(error)
        }
    }

    static async createTodo(req, res, next){
        
        const newTodo = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date,
            UserId: req.loggedInUser.id
        }

        try {
            if(new Date().getTime() > new Date(newTodo.due_date).getTime()){
                throw {
                    status: 400,
                    message: 'Date must be greater than today'
                }
            }else{  
                const data = await Todo.create(newTodo)
                res.status(201).json(data)
            }
        } catch (error) {
            next(error)
        }
    }

    static async getTodoById(req,res,next){
        const id = req.params.id

        try {
            const data = await Todo.findByPk(id)
            if(data){
                res.status(200).json(data)
            }
            else{
                throw{
                    status: 404,
                    message: 'Data not found'
                }
            }
        } catch (error) {
            next(error)
        }
    }

    static async editTodo(req, res, next){
        const id = req.params.id

        const updateTodo = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date
        }

        try {
            const data = await Todo.update(updateTodo,{
                where:{
                    id
                },
                returning: true
            })
            if(data[1].length > 0){
                res.status(200).json(data[1][0])
            }else{
                throw{
                    status: 404,
                    message: 'Id not found'
                }
            }
        } catch (error) {
            next(error)
        }
        
    }

    static async editstatusTodo(req,res,next){
        const id = req.params.id

        const updatestatusTodo = {
            status: req.body.status
        }

        try {
            const data = await Todo.update(updatestatusTodo,{
                where:{
                    id
                },
                returning: true
            })
            if(data[1].length > 0){
                res.status(200).json(data[1][0])
            }else{
                throw{
                    status: 404,
                    message: 'Id not found'
                }
            }
        } catch (error) {
            next(error)
        }
    }

    static async deleteTodo(req,res,next){
        const id = req.params.id

        try {
            const data =  await Todo.destroy({
                where: {
                    id
                }
            })
            if(data){
                res.status(200).json({message: 'todo success to delete'})
            }else{
                throw{
                    status: 404,
                    message: 'Id not found'
                }
            }
        } catch (error) {
            next(error)
        }
    }

    static async todayNews(req,res,next){
        axios({
            url: 'https://api.nytimes.com/svc/topstories/v2/world.json?api-key=s1UTO3G3SN9GioZKGcUsOgueVVo88C83',
            method: "GET"
        })
        .then(response => {
            console.log(response.data.results[0])
            res.status(200).json({title : response.data.results[0].title, url: response.data.results[0].url, image: response.data.results[0].multimedia[0].url})
        })
        .catch(err => {
            console.log(err)
            res.status(500).json(err)
        })
    }
}


module.exports = TodosController
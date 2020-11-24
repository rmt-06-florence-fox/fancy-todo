const { Todo } = require('../models/index')

class TodoController{
    static async postTodo(req,res,next){
        let obj = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date,
            UserId: req.loggedIn.id
        }
        try {
            let newTodo = await Todo.create(obj)
            res.status(201).json(newTodo)
        } catch (err) {
            if(err.name == 'SequelizeValidationError'){
                next(err)
            }else{
                next(err)
            }
        }
    }
    static async getTodo(req,res,next){
        try {
            let allTodo = await Todo.findAll({
                where:{
                    UserId: req.loggedIn.id
                }
            })
            res.status(200).json(allTodo)
        } catch (err) {
            next(err)
        }
    }
    static async getTodoId(req,res,next){
        let id = req.params.id
        try {
            let data = await Todo.findOne({ where: { id }})
            if(data){
                res.status(200).json(data)
            }else{
                throw{
                    status: 404,
                    msg: 'error not found'
                }
            }
        } catch (err) {
            next(err)
        }
    }
    static async putTodo(req,res,next){
        let id = req.params.id
        try {
            let newTodo = {
                title: req.body.title,
                description: req.body.description,
                status: req.body.status,
                due_date: req.body.due_date
            }
            let updatedTodo = await Todo.update(newTodo, {
                where:{
                    id
                },
                returning: true
            })
            if(updatedTodo[0] == 0){
                throw{
                    status: 404,
                    msg: 'error not found'
                }
            }else{
                res.status(200).json(updatedTodo)
            }
        } catch (err) {
            next(err)
        }
    }
    static async patchTodoId(req,res,next){
        let id = req.params.id
        try {
            let newData = {
                status: req.body.status
            }
            let updatedTodo = await Todo.update(newData, {
                where:{
                    id
                },
                returning:true
            })
            if(updatedTodo[0] === 0){
                throw {
                    status: 404,
                    msg: 'error not found'
                }
            }else{
                res.status(200).json(updatedTodo)
            }
        } catch (err) {
            next(err)
        }
    }
    static async deleteTodoId(req,res,next){
        let id = req.params.id
        try {
            let deletedTodo = await Todo.destroy({
                where:{
                    id
                }
            })
            if(deletedTodo === 0){
                throw{
                    status:404,
                    msg:'error not found'
                }
            }else{
                res.status(200).json(deletedTodo)
            }
        } catch (err) {
            next(err)
        }
    }
}


module.exports = TodoController
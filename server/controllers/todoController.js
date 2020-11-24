const { Todo } = require('../models/index')

class TodoController{
    static async postTodo(req,res){
        let obj = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date
        }
        try {
            let newTodo = await Todo.create(obj)
            res.status(201).json(newTodo)
        } catch (err) {
            if(err.name == 'SequelizeValidationError'){
                res.status(400).json({msg: err})
            }else{
                res.status(500).json({msg: 'Internal server error'})
            }
        }
    }
    static async getTodo(req,res){
        try {
            let allTodo = await Todo.findAll()
            res.status(200).json(allTodo)
        } catch (err) {
            res.status(500).json({msg: 'Internal server error'})
        }
    }
    static async getTodoId(req,res){
        let id = req.params.id
        try {
            let data = await Todo.findOne({ where: { id }})
            if(data){
                res.status(200).json(data)
            }else{
                res.status(404).json({msg: 'error not found'})
            }
        } catch (err) {
            res.status(500).json({msg: 'Internal server error'})
        }
    }
    static async putTodo(req,res){
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
                res.status(404).json({msg: 'error not found'})
            }else{
                res.status(200).json(updatedTodo)
            }
        } catch (err) {
            if(err.name == 'SequelizeValidationError'){
                res.status(400).json(err.message)
            }else{
                res.status(500).json({msg: 'Internal server error'})
            }
        }
    }
    static async patchTodoId(req,res){
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
                res.status(404).json({msg: 'error not found'})
            }else{
                res.status(200).json(updatedTodo)
            }
        } catch (err) {
            if(err.name == 'SequelizeValidationError'){
                res.status(400).json(err.message)
            }else{
                res.status(500).json({msg: 'Internal server error'})
            }
        }
    }
    static async deleteTodoId(req,res){
        let id = req.params.id
        try {
            let deletedTodo = await Todo.destroy({
                where:{
                    id
                }
            })
            if(deletedTodo === 0){
                res.status(404).json({msg: 'error not found'})
            }else{
                res.status(200).json(deletedTodo)
            }
        } catch (err) {
            res.status(500).json({msg: 'Internal server error'})
        }
    }
}


module.exports = TodoController
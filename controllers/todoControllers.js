const { static } = require("express")
const {Todo} = require("../models/index")

class TodoController{
    static async getTodos (req, res){
        try {
            const todos = await Todo.findAll()
            res.status(200).json(todos)
        } catch (error) {
            res.status(500).json(error)   
        }
    }

    static addTodo(req, res){
        const obj = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date,
        }
        Todo.create(obj)
        .then(data=>{
            // console.log(data)
            res.status(201).json(data)
        })
        .catch(e=>{
            if (e.name === 'SequelizeValidationError'){
                res.status(400).json({message: `${e.message}`})
            } else {
                res.status(500).json({message: `internal server error`})
            }
        })
    }
    
    static filterId(req, res){
        const id = req.params.id
        Todo.findByPk(id)
        .then(data=>{
            if(!data){
                res.status(404).json({message: `data not found`})
            } else {
                res.status(200).json(data)
            }
        })
        .catch(e=>{
            res.status(500).json({message: `internal server error`})
        })
    }

    static putTodos(req, res){
        const id = req.params.id
        const obj = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date
        }
        Todo.update(obj, {
            where:{
                id
            },
            returning: true
        })
        .then(data=>{
            if(!data){
                res.status(404).json({message: 'data not found'})
            } else {
                res.status(200).json(data[1][0])
            }
        })
        .catch(e=>{
            // console.log(e)
            // console.log(e.name)
            if (e.name === 'SequelizeValidationError'){
                res.status(400).json({message: `date must be greater than today`})
            } else {
                res.status(500).json({message: `internal server error`})
            }
        })
    }

    static editStatusTodo(req, res){
        const id = req.params.id
        const obj = {
            status: req.body.status
        }
        Todo.update(obj, {
            where:{
                id
            },
            returning: true
        })
        .then(data=>{
            
            if(!data){
                res.status(404).json({message: 'data not found'})
            } else {
                throw err
                res.status(200).json(data[1][0])
            }
        })
        .catch(e=>{
            console.log(e)
            if (e.name === 'SequelizeValidationError'){
                res.status(400).json({message: `status is required`})
            } else {
                res.status(500).json({message: `internal server error`})
            }
        })
    }

    static deleteId(req, res){
        const id = req.params.id
        Todo.destroy({
            where:{
                id
            }
        })
        .then(data=>{
            if(!data){
                res.status(404).json({message: 'data not found'})
            } else {
                res.status(200).json({message: `todo success to delete`})
            }
        })
        .catch(e=>{
            res.status(500).json({message: `internal server error`})
        })
    }
}

module.exports = TodoController
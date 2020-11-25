const { Todo } = require('../models/index')

class TodosController {

    static async getTodos(req,res){
        
        try {
            const data = await Todo.findAll({
                order: [['id','ASC']],
                where: {
                    UserId: req.loggedInUser.id
                }
            })
            res.status(200).json(data)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    static async createTodo(req, res){
        
        const newTodo = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date,
            UserId: req.loggedInUser.id
        }

        try {
            if(new Date().getTime() > new Date(newTodo.due_date).getTime()){
                res.status(400).json({message: 'validation errors'})
            }else{  
                const data = await Todo.create(newTodo)
                res.status(201).json(data)
            }
        } catch (error) {
                res.status(500).json(error)
        }
    }

    static async getTodoById(req,res){
        const id = req.params.id

        try {
            const data = await Todo.findByPk(id)
            if(data){
                res.status(200).json(data)
            }
            else{
                res.status(404).json({message: `Data not found`})
            }
        } catch (error) {
            res.status(500).json(error)
        }
    }

    static async editTodo(req, res){
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
                res.status(404).json({message: 'error id not found'})
            }
        } catch (error) {
                res.status(500).json(error)
        }
        
    }

    static async editstatusTodo(req,res){
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
                res.status(404).json({message: 'error id not found'})
            }
        } catch (error) {
            res.status(500).json(error)
        }
    }

    static async deleteTodo(req,res){
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
                res.status(404).json({message: 'error not found'})
            }
        } catch (error) {
            res.status(500).json(error)
        }
    }
}


module.exports = TodosController
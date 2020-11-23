const { Todo } = require('../models')

class TodoController{
    static async home (req, res){
        try{
            const data = await Todo.findAll()
            res.status(200).json(data)
        }
        catch (error){
            res.status(500).json({message: error.message})
        }
    }
    static async createTodos(req, res){
        const payload = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date
        }
        try {
            const todo = await Todo.create(payload)
            res.status(201).json(todo)
        } catch (error) {
            if(error.message === 'Validation error: invalid date'){
                res.status(400).json('expired date')
            }
            else{
                res.status(500).json(error.message)
            }
        }
    }
    static async searchTodo(req, res){
        try {
            const dataTodo = await Todo.findByPk(+req.params.id)
            res.status(200).json(dataTodo)
        } catch (error) {
            res.status(404).json(error)
        }
    }
    static async editTodo(req, res){
        const payload = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date
        }
        try{
            // const data = await Todo.findByPk(+req.params.id)
            const editData = await Todo.update(payload, {where: {id: +req.params.id}, returning: true});
            res.status(200).json(editData[1][0])
        }
        catch(error){
            if(error.message === 'Validation error: invalid date') res.status(400).json('Invalid date')
            else if(req.params.id === null){
                res.status(404).json({message: 'id not found'});
            }
            else{
                res.status(500).json(error.message)

            }
        }
    }
    static async modifyTodo(req, res){
        const payload = {
            status: req.body.status
        }
        try {
            if(req.params.id){
                const dataModify = await Todo.update(payload, {where: {id: +req.params.id}, returning: true})
                res.status(200).json(dataModify[1][0])
            }
            else{
                throw new Error('uwowo')
            }
        } catch (error) {
            if(error.message === 'Validation error: invalid date') res.status(400).json('Invalid date')
            else if(!req.params.id){
                res.status(404).json({message: 'id not found'});
            }
            else {
                res.status(500).json(error.message)
            }
        }
    }
    static async deleteTodo(req, res){
        try {
            const dataTodo = await Todo.destroy({where: {id: +req.params.id}});
            res.status(200).json('todo succes to delete');
        } catch (error) {
            res.status(500).json(error.message);
            
        }
    }

}

module.exports = TodoController
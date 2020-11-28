const { Todo } = require('../models')

class TodoController{
    static async home (req, res, next){
        try{
            console.log(req.loggedInUser.id )
            const data = await Todo.findAll({where: { UserId: req.loggedInUser.id}})
            console.log(data)
            res.status(200).json(data)
        }
        catch (error){
            next(error)
        }
    }
    static async createTodos(req, res, next){
        const payload = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date,
            UserId: req.loggedInUser.id
        }
        try {
            const todo = await Todo.create(payload)
            res.status(201).json(todo)
        } catch (error) {
            console.log(error)
            next(error)
        }
    }
    static async searchTodo(req, res, next){
        try {
            const dataTodo = await Todo.findByPk(req.params.id)
            if(!dataTodo){
                throw {message: 'id not found'}
            }
            else{
                if(dataTodo){
                    console.log(dataTodo)
                    const data = await Todo.findOne({where: {UserId: req.loggedInUser.id}, returning: true})
                    res.status(200).json(data)
                }
                else{
                    throw { message: 'you have to make a todo list first'}
                }
            }
        } catch (error) {
            next(error)
        }
    }
    static async editTodo(req, res, next){
        const payload = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date,
        }

        try{
            const editData = await Todo.update(payload, {where: {id: req.params.id}, returning: true});
            res.status(200).json(editData[1][0])
        }
        catch(error){
            next(error)
        }
    }
    static async updateStatusTodo(req, res, next){
        const payload = {
            status: req.body.status
        }
        console.log(req.loggedInUser)

        try {
            const dataModify = await Todo.update(payload, {where: {id: req.params.id}, returning: true})
            if(dataModify){
                res.status(200).json(dataModify[1][0])
            }
            else{
                throw {message: 'id not found'}
            }
        } catch (error) {
            next(error)
        }
    }
    static async deleteTodo(req, res, next){
        try {
            const dataTodo = await Todo.destroy({where: {id: +req.params.id}});
            res.status(200).json('todo succes to delete');
        } catch (error) {
            next(error)
        }
    }

}

module.exports = TodoController
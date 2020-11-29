const {ToDo} = require('../models/index')

class Controller{

    static home(req, res, next){
        try {
           res.status(200).json('home') 
        } catch (err) {
            next(err)
        }
        
    }

    static async listTodo(req, res, next){
        let id = req.activeUser.id
        try {
            const data = await ToDo.findAll({where : {userId : id}})
            res.status(200).json(data) 
        } catch (err) {
            next(err)
        }
    }

    static async addTodo(req, res, next){
        let activeUser = req.activeUser
        let newToDo = {
            title : req.body.title,
            description : req.body.description,
            status : "Pending",
            due_date : req.body.due_date,
            userId : activeUser.id
        }
        try {
            const newData = await ToDo.create(newToDo)
            res.status(201).json(newData) 
        } catch (err) {
            next(err)
        }        
    }

    static async searchbyid(req, res, next){
        let id = Number(req.params.id)
        try {
            const data = await ToDo.findByPk(id)
            if (data == null){
                throw {
                    status : 404,
                    message : 'Not Found'
                }
            } else {
                res.status(200).json(data)
            }
        } catch (err) {
            next(err)
        }
    }

    static async replaceTodo(req, res, next){
        let id = Number(req.params.id)
        let newData = {
            title : req.body.title,
            description : req.body.description,
            status : "Pending",
            due_date : req.body.due_date,
            createdAt : new Date(),
            updatedAt : new Date()
        }
        try {
            if (newData.due_date.getDate() == new Date().getDate()){
                if(newData.due_date.getMonth() == new Date().getMonth()){
                    throw {
                        status : 400, 
                        message : 'Due Date'
                    } 
                } 
            } else {
                const data = await ToDo.update(newData, {where : {id}, returning : true})  
                if (data[1][0] == null){
                    throw {
                        status : 404,
                        message :'Not Found'
                    }
                } else {
                    res.status(200).json(data[1][0])
                }
            }
        } catch (err) {
            next(err)
        }
    }

    static async updateData(req, res, next){
        let id = Number(req.params.id)
        let stat =  { status : req.body.status}
        try {
            if (stat.status == "Done" || stat.status == "Pending"){
                const find = await ToDo.findByPk(id)
                if (find == null){
                    throw {
                        status : 404,
                        message :'To Do Not Found'
                    }
                } else {
                    const updated = await ToDo.update(stat, {where : {id}, returning : true})
                    res.status(200).json(updated[1][0]) 
                }
            } else {
                throw {
                    status : 400,
                    message : 'Validation Error'
                }
            }
        } catch (err) {
            next(err)
        }
    }

    static async deletedTodo(req, res, next){
        let id = Number(req.params.id)
        try {
            const find = await ToDo.findByPk(id)
            if(find == null){
                throw {
                    status : 404,
                    message :'Not Found'
                }
            } else {
                const data = await ToDo.destroy({where : {id}})
                let message = 'todo success to delete'
                res.status(200).json({message}) 
            }
        } catch (err) {
            next(err)
        }
    }
}

module.exports = Controller
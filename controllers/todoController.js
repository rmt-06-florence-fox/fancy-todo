const { Todo } = require('../models')

class TodoController {

    static showList(req, res){
        Todo.findAll({
            where: {
                id: req.loggedId.id
            }
        })
        .then(data =>{
            res.status(200).json(data)
        })
        .catch(err =>{
            res.status(500).json({message:`Internal Server Error`})
        })
    }
    static addList(req, res){

        let newTodo = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            date: new Date(req.body.date),
            UserId: req.loggedId.id
        }
        Todo.create(newTodo)
        .then(result =>{
            res.status(201).json(result)
        })
        .catch(err =>{
            if(err.errors[0].message == 'due date must be greater than today dude !!'){
                res.status(400).json({message: err.message})
            } else {
                res.status(500).json({message:`Internal Server Error`})
            }
        })
    }

    static getList(req, res){
        let dataId = +req.params.id

        Todo.findByPk(dataId)
        .then(data =>{
            res.status(200).json(data)
        })
        .catch(err =>{
            console.log(err)
            res.status(404).json(err)
        })
    }

    static putNewList(req, res){
        let putId = +req.params.id
        let newTodo = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            date: new Date(req.body.date)
        }

        Todo.update(newTodo, {
            where:{
                id: putId
            }
        })
        .then(data =>{
            if(data[0]){
                return Todo.findByPk(putId)
                
            } else {
                res.status(404).json({message: 'Error not found'})
            }
        })
        .then(result =>{
            res.status(200).json(result)
        })
        .catch(err =>{
            if(err.errors[0].message == 'due date must be greater than today dude !!'){
                res.status(400).json({message: err.message})
            } else {

                res.status(500).json({message:`Internal Server Error`})
            }
        })

    }

    static patchList(req, res){
        let patchData = {
            status: req.body.status
        }
        let patchId = req.params.id

        Todo.update(patchData, {
            where: {
                id : patchId 
            } 
        })
        .then(data =>{
            if(data[0]){
                return Todo.findByPk(patchId)
            } else {
                res.status(404).json({message: 'Error not found'})
            }
        })
        .then(result =>{
            res.status(200).json(result)

        })
        .catch(err =>{
            if(err.errors[0].message == 'due date must be greater than today dude !!'){
                res.status(400).json({message: err.message})
            } else {

                res.status(500).json({message:`Internal Server Error`})
            }
        })
    }

    static destroyList(req, res){
        let deleteId = +req.params.id

        Todo.destroy({
            where:{
                id: deleteId
            }
        })
        .then(result =>{
            if(result){
            res.status(200).json({message: 'todo success to delete'})
            } else {
                console.log(result)
                res.status(404).json({message: 'Error not found'})
            }
        })
        .catch(err =>{
            res.status(500).json({message:`Internal Server Error`})
        })
    }

}


module.exports = TodoController
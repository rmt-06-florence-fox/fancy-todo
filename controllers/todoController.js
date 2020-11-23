const {Todo, User} = require('../models/index')
const Bcrypt = require('../helper/bcrypt')
const jwt = require('jsonwebtoken');
class TodoController{
    // static async todo(req, res){
    //     try {
    //         const obj = {
    //             title: `belajar API`,
    //             description: 'hari pertama p2',
    //             due_date: new Date(),
    //             createdAt: new Date(),
    //             updatedAt: new Date()
    //         }
    //         const data = await Todo.create(obj)
    //         // const data2 = await Todo.findAll()
    //         res.status(200).json(data)
    //     } catch (error) {
    //         res.status(400).json(error)
    //     }
    // }
    // static todo(req, res){
    //     const obj = {
    //             title: `belajar API`,
    //             description: 'hari pertama p2',
    //             due_date: new Date(),
    //             createdAt: new Date(),
    //             updatedAt: new Date()
    //         }
    //     Todo.create(obj)
    //     .then(data => {
    //         res.status(200).json(data)
    //     })
    //     .catch(error => {
    //         res.status(400).json(error)
    //     })
    // }
    static create(req, res){
        const obj = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date,
            UserId: req.body.UserId
        }
        Todo.create(obj)
         .then(value => {
            res.status(200).json(value)
         })
         .catch(error => {
            if (error.name == 'SequelizeValidationError') {
                res.status(400).json(error.errors[0].message)
            }else{
                res.status(500).json(`oops sorry, it seems server is problem`)
            }
        })
    }
    static getTodos(req, res){
        Todo.findAll({
            include: [User]
        })
        .then(value => {
            res.status(200).json(value)
        })
        .catch(error => {
            res.status(500).json(`oops sorry, it seems server is problem`)
        })
    }
    static findById(req, res){
        const id = +req.params.id
        Todo.findByPk(id,{
            include: [User]
        })
        .then(value => {
            if (!value) {
                res.status(404).json(`data not found`)
            }else{
                res.status(200).json(value)
            }
        })
        .catch(error => {
            res.status(500).json(`oops sorry, it seems server is problem`)
        })
    }
    static put(req, res){
        const id = +req.params.id
        const obj = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date
        }
        Todo.findByPk(id)
         .then(value => {
             if (!value) {
                res.status(404).json(`data not found`)
             }else{
                return Todo.update(obj, {
                    where: {id : id},
                    returning: true
                  })
             }
         })
        // Todo.update(obj,{ where: {
        //      id
        // }, returning: true})
        .then(value => {
            console.log(value);
            res.status(200).json(value)
        })
        .catch(error => {
            if (error.name == 'SequelizeValidationError') {
                res.status(400).json(error.errors[0].message)
            }else{
                res.status(500).json(`oops sorry, it seems server is problem`)
            }
        })
    }
    static patch(req, res){
        const id = +req.params.id
        const obj = {status: req.body.status}
        Todo.findByPk(id)
         .then(value => {
            if (!value) {
                res.status(404).json(`data not found`)
             }else{
                return Todo.update(obj, {
                    where: {id : id},
                    returning: true
                  })
             }
         })
         .then(value => {
            console.log(value);
            res.status(200).json(value)
        })
        .catch(error => {
            if (error.name == 'SequelizeValidationError') {
                res.status(400).json(error.errors[0].message)
            }else{
                res.status(500).json(`oops sorry, it seems server is problem`)
            }
        })
    }
    static remove(req, res){
        const id = +req.params.id
        Todo.findByPk(id)
         .then(value => {
            if (!value) {
                res.status(404).json(`data not found`)
             }else{
                return Todo.destroy({
                    where: {id : id},
                  })
             }
         })
         .then(value => {
            res.status(200).json(`todo succes to delete`)
        })
        .catch(error => {
                res.status(500).json(`oops sorry, it seems server is problem`)
        })
    }
}
module.exports = TodoController
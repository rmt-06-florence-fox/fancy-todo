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
    static create(req, res, next){
        const obj = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date,
            UserId: req.loginUser.id
        }
        Todo.create(obj)
         .then(value => {
            res.status(200).json(value)
         })
         .catch(error => {
            next(error)
        })
    }
    static getTodos(req, res, next){
        const id = req.loginUser.id
        Todo.findAll({
            where: {UserId : id}
        })
        .then(value => {
            res.status(200).json(value)
        })
        .catch(error => {
            next(error)
        })
    }
    static findById(req, res, next){
        const id = +req.params.id
        Todo.findByPk(id,{
            include: [User]
        })
        .then(value => {
            if (!value) {
                // res.status(404).json(`data not found`)
                throw {
                    status: 404,
                    message: `data not ound`
                }
            }else{
                res.status(200).json(value)
            }
        })
        .catch(error => {
            next(error)
        })
    }
    static put(req, res, next){
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
                // res.status(404).json(`data not found`)
                throw {
                    status: 404,
                    message: `data not ound`
                }
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
            next(error)
        })
    }
    static patch(req, res, next){
        const id = +req.params.id
        const obj = {status: req.body.status}
        Todo.findByPk(id)
         .then(value => {
            if (!value) {
                // res.status(404).json(`data not found`)
                throw {
                    status: 404,
                    message: `data not ound`
                }
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
           next(error)
        })
    }
    static remove(req, res, next){
        const id = +req.params.id
        Todo.findByPk(id)
         .then(value => {
            if (!value) {
                // res.status(404).json(`data not found`)
                throw {
                    status: 404,
                    message: `data not ound`
                }
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
            next(error)
        })
    }
    static listHoliday(req, res, next){
        axios({
            method: 'get',
            url: `https://holidayapi.com/v1/holidays${process.env.rdparty}`
            
          })
        .then(value => {
            res.status(200).json(value)
        })
        .catch(error => {
            console.log(error);
            next(error)
        })
    }
}
module.exports = TodoController
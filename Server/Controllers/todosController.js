const axios = require('axios');
const {Todo} = require('../models');

class Controller {
    static async getTodos(req, res, next) {
        try {
            const todos = await Todo.findAll({where: {UserId: req.loggedIn.id}});
            res.status(200).json(todos);
        } catch (error) {
            next(error)
        }
    }
    static async postTodos(req, res, next) {
        const newInputTodo = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date,
            UserId: req.loggedIn.id
        }
        try {
            const newTodo = await Todo.create(newInputTodo);
            res.status(201).json(newTodo);
        } catch (error){
            if(error.errors[0]){
                const err = {
                    status: 400, 
                    message: 'Validation error',
                    errors: error.errors
                }
                next(err)
            } else {
                next(error);
            }
        }
    }
    static async findOneTodo(req, res, next){
        const idToFind = Number(req.params.id)
        try {
            const foundTodo = await Todo.findOne({where: {id: idToFind}})
            if(!foundTodo){
                throw {
                    status: 404,
                    message: 'Not Found'
                };
            }
            res.status(200).json(foundTodo);
        } catch (error) {
            next(error);
        }
    }

    static async updateTodo(req, res, next){
        const idToUpdate = Number(req.params.id)
        const payload = {
            title: req.body.title,
            description: req.body.description,
            status: req.body.status,
            due_date: req.body.due_date,
        }
        try {
            const updatedTodo = await Todo.update(payload, {where: {id: idToUpdate}, individualHooks: true})
            if(!updatedTodo[1][0]){
                throw {
                    status: 404,
                    message: 'Not Found'
                };
            }
            res.status(200).json(updatedTodo[1][0]);
        } catch (error) {
            if(error.errors[0]){
                const err = {
                    status: 400, 
                    message: 'Validation error',
                    errors: error.errors
                }
                next(err);
            } else {
                next(error);
            }
        }
    }

    static async updateStatusTodo(req, res, next){
        const idToUpdate = req.params.id;
        const payload = {
            status: req.body.status
        }
        try {
            const updatedTodo = await Todo.update(payload, {where: {id: idToUpdate}, individualHooks: true})
            if(!updatedTodo[1][0]){
                throw {
                    status: 404,
                    message: 'Not Found'
                }
            }
            res.status(200).json(updatedTodo[1][0]);
        } catch (error){
            console.log(error);
            if(error.errors[0]){
                const err = {
                    status: 400, 
                    message: 'Validation error',
                    errors: error.errors
                }
                next(err);
            } else {
                next(error);
            }
        }
    }

    static async removeTodo(req, res, next){
        const idToRemove = req.params.id;
        try {
            const removedTodo = await Todo.destroy({where: {id: idToRemove}});
            if(!removedTodo){
                throw {
                    status: 404,
                    message: 'Not Found'
                }
            }
            res.status(200).json({message: 'Todo success to delete'})
        } catch(error){
            next(error);
        }
    }

    static holidayList(req, res, next){
        axios({
            url: 'https://calendarific.com/api/v2/holidays',
            method: "GET",
            params: {
                api_key: process.env.CALENDARTOKEN,
                year: new Date().getFullYear(),
                country: 'id'
            }
        })
        .then((response)=>{
            res.json({holidays: response.data.response.holidays})
        })
        .catch((err) =>{
            console.log(err);
            next(err);
        })
    }
}

module.exports = Controller;
const { Todo } = require('../models')
const axios = require('axios');
const { response } = require('express');

class TodoController {

    static showList(req, res, next){
        let listTodo;
        Todo.findAll({
            where: {
                UserId: req.loggedId.id
            }
        })
        .then(data =>{
            listTodo = data
            return axios ({
                method: 'get',
                url: 'https://quote-garden.herokuapp.com/api/v2/quotes/random'
            })
            // res.status(200).json(data)
        })
        .then(result =>{
            let quote = result.data.quote
            res.status(200).json({quote, listTodo})
        })
        .catch(err =>{
            next(err)
        })
    }
    static addList(req, res, next){

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
            next(err)
        })
    }

    static getList(req, res, next){
        let dataId = +req.params.id

        Todo.findByPk(dataId)
        .then(data =>{
            res.status(200).json(data)
        })
        .catch(err =>{
            next(err)
        })
    }

    static putNewList(req, res, next){
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
                next({
                    status: 404,
                    message: 'Error not found'})
            }
        })
        .then(result =>{
            res.status(200).json(result)
        })
        .catch(err =>{
            next(err)
        })

    }

    static patchList(req, res, next){
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
                next({
                    status: 404,
                    message: 'Error not found'})
            }
        })
        .then(result =>{
            res.status(200).json(result)

        })
        .catch(err =>{
            next(err)
        })
    }

    static destroyList(req, res, next){
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
                next({
                    status: 404,
                    message: 'Error not found'})
            }
        })
        .catch(err =>{
            next(err)
        })
    }

}


module.exports = TodoController
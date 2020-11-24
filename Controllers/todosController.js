const {Todo} = require('../models');

class Controller {
    static async getTodos(req, res) {
        try {
            const todos = await Todo.findAll();
            res.status(200).json(todos);
        } catch (error) {
            res.status(500).json(error);
        }
    }
    static async postTodos(req, res) {
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
            if(error.errors[0].message == 'Date must be greater than now' || error.errors[0].message == "Use 'MM/DD/YYYY' Format" || error.erros[0].message == "Status must be 'Sedang dikerjakan' or 'Akan dikerjakan' or 'Sudah dikerjakan"){
                res.status(400).json(error);
            } else {
                res.status(500).json(error)
            }
        }
    }
    static async findOneTodo(req, res){
        const idToFind = Number(req.params.id)
        try {
            const foundTodo = await Todo.findOne({where: {id: idToFind}})
            if(!foundTodo){
                throw new Error('Id Not Found');
            }
            res.status(200).json(foundTodo);
        } catch (error) {
            res.status(404).json({error: error.message});
        }
    }

    static async updateTodo(req, res){
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
                throw new Error('Id Not Found');
            }
            res.status(200).json(updatedTodo[1][0]);
        } catch (error) {
            if(error.message == 'Id Not Found'){
                res.status(404).json({error: error.message})
            } else if(error.errors[0].message == 'Date must be greater than now' || error.errors[0].message == "Use 'MM/DD/YYYY' Format" || error.errors[0].message == "Status must be 'Sedang dikerjakan' or 'Akan dikerjakan' or 'Sudah dikerjakan"){
                res.status(400).json(error);
            } else {
                res.status(500).json(error);
            }
        }
    }

    static async updateStatusTodo(req, res){
        const idToUpdate = req.params.id;
        const payload = {
            status: req.body.status
        }
        try {
            const updatedTodo = await Todo.update(payload, {where: {id: idToUpdate}, individualHooks: true})
            if(!updatedTodo[1][0]){
                throw new Error('Id Tidak Ditemukan')
            }
            res.status(200).json(updatedTodo[1][0]);
        } catch (error){
            if(error.message == 'Id Tidak Ditemukan'){
                res.status(404).json({error: error.message});
            if(error.message == "Status must be 'Sedang dikerjakan' or 'Akan dikerjakan' or 'Sudah dikerjakan"){
                res.status(400).json(error.message);
            }
            } else {
                res.status(500).json(error);
            }
        }
    }

    static async removeTodo(req, res){
        const idToRemove = req.params.id;
        try {
            const removedTodo = await Todo.destroy({where: {id: idToRemove}});
            if(!removedTodo){
                throw new Error('Id Not Found')
            }
            res.status(200).json({message: 'Todo success to delete'})
        } catch(error){
            if(error.message == 'Id Not Found'){
                res.status(404).json({error: error.message});
            } else {
                res.status(500).json(error);
            }
        }
    }
}

module.exports = Controller;
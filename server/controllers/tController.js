const { Todo } = require("../models");

class tController {
    static async read(request, response) {
        try {
            const data = await Todo.findAll();
            response.status(200).json({data});
            console.log(data);
        } catch (error) {
            console.log(error);
            response.status(500).json({ message: "Internal Server Error"});
        }
    }

    static async readById(request, response) {
        try {
            const data = await Todo.findById({
                where: {
                    id: request.params.id
                }
            });
            response.status(200).json({data});
            console.log(data);
        } catch (error) {
            console.log(error);
            response.status(500).json({ message: "Internal Server Error"});
        }
    }

    static async create(request, response) {
        const newData = {
            title: request.body.title,
            description: request.body.description,
            status: request.body.status,
            due_date: request.body.due_date
        }
        try {
            const data = await Todo.create(newData);
            response.status(201).json({data});
            console.log(data);
        } catch (error) {
            console.log(error);
            response.status(500).json({ message: "Internal Server Error" })
        }
    }

    static async patch(request, response) {
        const todoId = +request.params.id
        const newData = {
            title: request.body.title,
            description: request.body.description,
            status: request.body.status,
            due_date: request.body.due_date
        }
        try {
            const data = await Todo.update(newData, {
                where: { id: todoId},
                returning: true
            }) 
            response.status(200).json(data[1][0])
        } catch (error) {
            console.log(error);
            response.status(500).json({ message: "Internal Server Error" })
        }   
    }

    static async put(request, response) {
        const todoId = +request.params.id
        const newData = {
            status: +request.body.status
        }
        try {
            const data = await Todo.update(newData, {
                where: { id: todoId },
                returning: true
            })
            response.status(200).json(data[1][0])
        } catch (error) {
            console.log(error);
            response.status(500).json({ message: "Internal Server Error" })
        }
    }

    static async delete(request, response) {
        const todoId = +request.params.id
        try {
            const data = await Todo.destroy({
                where: { id: todoId},
                returning: true
            })
            response.status(200).json({ message: "Delete Success!"})
        } catch (error) {
            console.log(error);
            response.status(500).json({ message: "Internal Server Error" })
        }
    }
}

module.exports = tController
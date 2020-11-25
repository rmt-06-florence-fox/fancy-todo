const { Todo } = require("../models");

class todoController {
    static async read(request, response) {
        const userId = request.loggedInUser.id;
        try {
            const data = await Todo.findAll({
                where: { UserId: userId },
                order: [["due_date", "DESC"]]
            });
            response.status(200).json({ data });
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    static async readById(request, response) {
        const userId = request.loggedInUser.id;
        const todoId = request.params.id;
        try {
            const data = await Todo.findById({
                where: {
                    UserId: userId,
                    id: todoId
                }
            });
            response.status(200).json({ data });
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    static async create(request, response) {
        const newData = {
            title: request.body.title,
            description: request.body.description,
            status: request.body.status,
            due_date: request.body.due_date,
            UserId: request.loggedInUser.id
        }
        try {
            const data = await Todo.create(newData);
            const addedData = {
                "title": data.title,
                "description": data.description,
                "status": data.status,
                "due_date": data.due_date,
                "UserId": data.id
            }
            response.status(201).json({ addedData });
        } catch (error) {
            console.log(error);
            next(error)
        }
    }

    static async put(request, response) {
        const userId = request.loggedInUser.id;
        const todoId = +request.params.id;
        const newData = {
            title: request.body.title,
            description: request.body.description,
            status: request.body.status,
            due_date: request.body.due_date
        }
        try {
            const data = await Todo.update(newData, {
                where: { 
                    UserId: userId,
                    id: todoId 
                },
                returning: true
            })
            response.status(200).json(data[1][0])
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    static async patch(request, response) {
        const userId = request.loggedInUser.id;
        const todoId = +request.params.id;
        const newData = { status: request.body.status }
        try {
            const data = await Todo.update(newData, {
                where: { UserId: userId, id: todoId },
                returning: true
            })
            response.status(200).json(data[1][0])
        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    static async delete(request, response) {
        const todoId = +request.params.id
        try {
            const data = await Todo.destroy({
                where: { id: todoId },
                returning: true
            })
            response.status(200).json({ message: "Delete Success!" })
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
}

module.exports = todoController
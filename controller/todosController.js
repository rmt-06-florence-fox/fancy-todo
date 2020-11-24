const {Todo} = require('../models')
class TodoController {
    static async getTodos(req, res) {
    // res.status(200).json([
    //     {
    //         "title": "Learn REST API",
    //         "description": "Learn how to create RESTful API with Express and Sequelize",
    //         "due_date": "2020-01-29"
    //     }
    // ])

    // const todos = await Todo.findAll()
    // res.status(200).json(todos)

    try {
        const data = await Todo.findAll()
        // throw("error")
        res.status(200).json({data})
    } catch (error) {
        res.status(500).json(error)
        
    }
    }

    static createTodo (req, res) {
        const { title, description, due_date, status } = req.body
        console.log(req.body);

        const payload = {
            title, //: req.body.title,
            description, //: req.body.description,
            due_date, //: req.body.due_date,
            status //: req.body.status
        }

        
        Todo
        // .create(req.body)
        .create(payload)
        .then(data =>{
            console.log(data);
            res.status(201).json(data)
        })
        .catch(err => {
            res.status(400).json()
        })

    }

    static async updateTodo (req, res) {
            const id = +req.params.id
            const payload = {
                title : req.body.title,
                description : req.body.description,
                status : req.body.status,
                due_date : req.body.due_date
        }

        try {
            let data = await Todo.findByPk(id)
            if (data) {
                const updatedData = await Todo.update(payload, {
                    where: {
                        id
                    },
                    returning : true, // krn ini async mesti returning ini, kalo gak ada , gaada yg direturn
                })

                if (!updatedData) {
                res.status(400).json({message : 'Validation Errors'})
                } else {
                    // console.log
                }
            } else {
                res.status(404).json({message : 'Error Not Found'})
                // kalau pakai findbyPK ini bakal keliatan, bs dpt semua
            }

        } catch (error) {
            console.log(error);
            res.status(500).json({message : 'Internal Server Errors'})
        }
        
    }

    static async updateStatusTodo(req, res) {
        const id = +req.params.id
        // console.log(req.params);
        const payload = {
            status : req.body.status,
        }

        try {
            console.log(req.body);
            const data = await Todo.update(payload, {
                    where: {
                        id
                    },
                    returning : true,
                })

                res.status(500).json(200)

            

        } catch (error) {
            res.status(500).json({message : 'Internal Server Errors'})
        }

        
    }

    static async deleteTodo(req, res) {
        const id = +req.params.id

        try {
            await Todo.destroy({
                where: {
                    id
                },
                // returning : true => gak direturn krn delete
            })
            res.status(200).json(200)

        } catch (error) {
            console.log(error);
            res.status(500).json({ message : 'Internal Server Errors'})
        }
    }
}

module.exports = TodoController
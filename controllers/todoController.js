const {Todo} = require('../models/index')

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
    static todo(req, res){
        const obj = {
                title: `belajar API`,
                description: 'hari pertama p2',
                due_date: new Date(),
                createdAt: new Date(),
                updatedAt: new Date()
            }
        Todo.create(obj)
        .then(data => {
            res.status(200).json(data)
        })
        .catch(error => {
            res.status(400).json(error)
        })
    }
}
module.exports = TodoController
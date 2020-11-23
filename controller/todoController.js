const {Todo} = require('../models/index.js')


class TodoController {
    
    static async getData(req,res) {
        try {
            const todoData = await Todo.findAll()
            res.status(200).json(todoData)
        } catch (error) {
            res.status(500).json(error)
        }
    }

    static async getDataById(req,res){
        const id = +req.params.id
        try {
            const todoById = await Todo.findByPk(id)
            console.log(`===============Get Data By Id ${id}========================`)
            console.log(todoById)
            if (!todoById){
                throw ('Error Not found')
            }else {
                res.status(200).json(todoById)
            }
        } catch (error) {
            res.status(404).json({error:'Error Not Found'})
        }
    }

    static async createTodo(req,res) {
        const newData = {
            title : req.body.title,
            description : req.body.description,
            due_date : req.body.due_date,
            status : req.body.status

        }
        console.log(newData)

        try {
            const data= await Todo.create(newData)
            console.log('=====================Create new Data ==========================')
            console.log(data)
            res.status(201).json(data)
        } catch (error) {  
            if(error.name = "SequelizeValidationError") {
                res.status(400).json({error: 'Validation Error'})
            }else {
                res.status(500).json(error)
            }
        }
    }

    static async replaceTodo(req,res){
        const id = +req.params.id
        const editedData = {
            title : req.body.title,
            description : req.body.description,
            status : req.body.status,
            due_date : req.body.due_date
        }
        console.log('================Edit Data =====================')
        console.log(editedData)
        
        try {
            const data = await Todo.update(editedData, {
                where : {
                    id:id
                },
                returning : true
            })
            console.log('============Replace Data===================')
            console.log(data[1][0])
            if (!data[1][0]){
                console.log('===============Eror Not Found============')
                throw ('Error Not Found')
            }else {
                res.status(200).json(data[1][0])
            }
        } catch (error) {
            if (error == 'Error Not Found'){
                console.log('=====================404============================')
                res.status(404).json({error: "Error Not Found"})
            }else if(error.name == 'SequelizeValidationError'){
                console.log('===============Validation Error =============')
                res.status(400).json({error : error.message})
            }
            else {
                res.status(500).json(error)
            }
        }
    }

    static async modifyTodo(req,res){
        const id = req.params.id 
        const status = {
            status : req.body.status
        }
        console.log('============Modify data==============')
        console.log(status,id)

        try {
            console.log('=========== Try =================')
            const statusEdited = await Todo.update( status, {
                where : {
                    id
                },
                returning : true
            })
            if(!statusEdited[1][0]){
                console.log('=========404================')
                throw ('Error Not Found')
            }
            console.log('======= Status Edited ========== ')
            console.log(statusEdited)
            res.status(200).json(statusEdited[1][0])
        } catch (error) {
            if (error.name == "SequelizeValidationError"){
                res.status(400).json({error:error.message})
            }else if(error == 'Error Not Found'){
                res.status(404).json({error:'Error Not Found'})
            }else {
                res.status(500).json(error)
            }
        }
    }

    static async destroyTodo(req,res){
        const id = req.params.id

        try {
            const destroyed = await Todo.destroy({
                where : {
                    id: id
                }
            }) 
            if(!destroyed){
                throw ('Error Not Found')
            }else{
                console.log('============ Menghapus data berhasil=============')
                res.status(200).json({message:'Todo Success to delete'})
            }
        } catch (error) {
            if( error == 'Error Not Found'){
                res.status(404).json({error: 'Error Not Found'})
            }
            else {
                res.status(500).json(error)
            }

        }
    }
}


module.exports = TodoController
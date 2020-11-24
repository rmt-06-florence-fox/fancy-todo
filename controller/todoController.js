const {Todo} = require('../models/index.js')
const { Op } = require('sequelize')
const axios = require('axios')


class TodoController {
    
    static async getData(req,res,next) {
        console.log('================== Token decoded data==============')
        console.log(req.loggedInUser.payload.id)
        const userId = req.loggedInUser.payload.id
        try {
            const todoData = await Todo.findAll({
                where : {
                    UserId : userId
                }
            })
            res.status(200).json(todoData)
        } catch (error) {
            next(error)
            // res.status(500).json(error)
        }
    }

    static async getDataById(req,res,next){

        // Find todo by Id
        const userId = req.loggedInUser.payload.id
        console.log(userId)
        const id= req.params.id
        try {
            const todoById = await Todo.findAll({
                where : {
                    [Op.and] : [
                        {id},
                        {UserId : userId}
                    ]
                }
            })
            console.log(`===============Get Data By Id ${id}========================`)
            console.log(todoById)
            if (!todoById.length){
                throw {
                    status : 404,
                    message : 'Data not Found'
                }
            }else {
                res.status(200).json(todoById)
            }
        } catch (error) {
            next(error)
        }
    }

    static async createTodo(req,res,next) {
        const userId = req.loggedInUser.payload.id
        const newData = {
            title : req.body.title,
            description : req.body.description,
            due_date : req.body.due_date,
            status : req.body.status,
            UserId : userId
        }
        console.log(newData)

        try {
            const data= await Todo.create(newData)
            console.log('=====================Create new Data ==========================')
            console.log(data)
            res.status(201).json(data)
        } catch (error) {  
            next((error))
            // if(error.name = "SequelizeValidationError") {
            //     res.status(400).json({error: 'Validation Error'})
            // }else {
            //     res.status(500).json(error)
            // }
        }
    }

    static async replaceTodo(req,res,next){
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
                throw {
                    status : 404,
                    message : 'Data Not found'
                }
            }else {
                res.status(200).json(data[1][0])
            }
        } catch (error) {
            next (error)
            // if (error == 'Error Not Found'){
            //     console.log('=====================404============================')
            //     res.status(404).json({error: "Error Not Found"})
            // }else if(error.name == 'SequelizeValidationError'){
            //     console.log('===============Validation Error =============')
            //     res.status(400).json({error : error.message})
            // }
            // else {
            //     res.status(500).json(error)
            // }
        }
    }

    static async modifyTodo(req,res,next){
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
                throw {
                    status : 404,
                    message : 'Data not found'
                }
            }
            console.log('======= Status Edited ========== ')
            console.log(statusEdited)
            res.status(200).json(statusEdited[1][0])
        } catch (error) {
            next(error)
            // if (error.name == "SequelizeValidationError"){
            //     res.status(400).json({error:error.message})
            // }else if(error == 'Error Not Found'){
            //     res.status(404).json({error:'Error Not Found'})
            // }else {
            //     res.status(500).json(error)
            // }
        }
    }

    static async destroyTodo(req,res,next){
        const id = req.params.id

        try {
            const destroyed = await Todo.destroy({
                where : {
                    id: id
                }
            }) 
            if(!destroyed){
                throw {
                    status : 404,
                    message : 'data not found'
                }
            }else{
                console.log('============ Menghapus data berhasil=============')
                res.status(200).json({message:'Todo Success to delete'})
            }
        } catch (error) {
            next(error)
            // if( error == 'Error Not Found'){
            //     res.status(404).json({error: 'Error Not Found'})
            // }
            // else {
            //     res.status(500).json(error)
            // }

        }
    }

    static async exchangeAPI(req,res,next){
        try {
            const exchangeData = await axios({
                method : 'get',
                url : `https://v6.exchangerate-api.com/v6/${process.env.exchange_rate_key}/latest/IDR`
            })
            console.log(exchangeData)
            res.status(200).json(exchangeData.data)
        } catch (error) {
            next(error)
        }
    }
}


module.exports = TodoController
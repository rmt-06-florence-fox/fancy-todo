const {Todo} = require('../models/index.js')
const { Op } = require('sequelize')


async function authorization(req,res,next){
    try {
        console.log('============== Authorization=================')
        const todoId = req.params.id 
        const userId = req.loggedInUser.payload.id
        const todo = await Todo.findOne({
            where : {
                [Op.and] : [
                    {id : todoId},
                    {UserId : userId}

                ]
            }
        })

        console.log(todo.dataValues)
        if(todo){
            next()
        }else {
            res.status(401).json({message : 'Unauthorized to access'})
        }


    } catch (error) {
        res.status(401).json({message : 'Unauthorized to access'})
    }
}


module.exports = authorization
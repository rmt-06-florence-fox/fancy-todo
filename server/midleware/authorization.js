const {Todo} = require('../models/index.js')
const { Op } = require('sequelize')


async function authorization(req,res,next){
    try {
        console.log('============== Authorization=================')
        const todoId = req.params.id 
        const userId = req.loggedInUser.payload.id
        console.log('here')
        const todo = await Todo.findOne({
            where : {
                [Op.and] : [
                    {id : todoId},
                    {UserId : userId}

                ]
            }
        })
        console.log('===========Success findone======')
        console.log(todo)
        if(todo){
            next()
        }else {
            console.log('==========Cannot Get data======')
            throw {
                status : 401,
                message : 'Unauthorized to access'
            }
        }

    }catch(error) {
        console.log('==========Authorized error=========')
        console.log(error)
        // res.status(401).json({message : 'Unauthorized to access'})
        next(error)
    }
}


module.exports = authorization
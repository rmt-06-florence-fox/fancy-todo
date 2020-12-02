const {Todo} = require('../models')
const jwt = require('jsonwebtoken')

async function authorization(req,res,next){
    try {
        let id = req.params.id
        let todos = await Todo.findAll({
            where:{
                id,
                UserId: req.loggedIn.id
            }
        })
        if(todos.length < 1){
            throw {
                status: 401,
                msg: 'error not authorized'
            }
        }else{
            next()
        }
    } catch (err) {
        next(err)
    }
}

module.exports = authorization
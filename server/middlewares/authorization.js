const {ToDo} = require('../models')

module.exports = async function(req, res, next){
    const UserId = +req.headers.loggedInUser.id 
    const todoId = +req.params.id
    //console.log(todoId, 'dari authorizsation')
    try {
        const datum = await ToDo.findByPk(todoId)
        
        if(+datum.UserId === UserId) next()
        else throw {
            message : 'you have no permission to access this todo',
            status : 401
        }

    } catch (err){
        next(err)
    }
} ;
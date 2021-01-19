const { Todo } = require('../models')

async function authorization(req, res, next){
    try {
        const todo = await Todo.findOne({where: {id: req.params.id}})
        console.log(req.loggedInUser)
        if(todo){
            if(todo.UserId === req.loggedInUser.id){
                next()
            }
            else{
                throw {status: 401, message: 'you are not autorized to access this todo'}
            }
        }
        else{
            throw {
                status: 404,
                message: 'id not found'
            }
        }
    } catch (error) {
        next(error)
    }
}

module.exports = authorization
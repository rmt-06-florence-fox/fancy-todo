const {Todo} = require('../models')

module.exports = async (req, res, next) => {
    try {
        const todo = await Todo.findOne({
            where: {
                id : req.params.id
            }
        })
        if(todo.UserId === req.loggedInUser.id) {
            next()
        } else {
            throw {
                errorDesc : 'AuthenticationFailed'
            }
        }

    } catch (error) {
        next(error)
        
    }
}

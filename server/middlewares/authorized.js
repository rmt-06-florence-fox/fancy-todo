const { Todo } = require('../models/index')

module.exports = async (req, res, next) => {
    try {
        const todo = await Todo.findOne({where: {id: Number(req.params.id)}})
        if (todo) {
            if(todo.UserId === req.loggedInUser.id) {
                next()
            } else {
                throw{
                    status: 401,
                    message: `You aren't authorized`
                }
            }
        } else {
            throw{
                status: 404,
                message: `Data not found`
            }
        }
    } catch (error) {
        next(error)
    }
}
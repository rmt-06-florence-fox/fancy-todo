const { Todo } = require('../models')

module.exports = async (req, res, next) => {
    try {
        const todo = await Todo.findOne({
            where: {
                id: req.params.id
            }
        })
        if (!todo) {
            throw {
                status: 404,
                message: `Error, Data Not Found`
            }
        } else if (todo.UserId == req.loggedInUser.id) {
            next()
        } else {
            throw {
                status: 401,
                message: `You are not authorized to access this data`
            }
        }
    } catch (error) {
        next(error)
    }
}
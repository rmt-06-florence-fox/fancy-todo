const { Todo } = require('../models')

module.exports = async (req, res, next) => {
    try {
        const todo = await Todo.findOne({
            where: {
                id: req.params.id
            }
        })
        if(todo.UserId === req.loggedInUser.id) {
            next()
        } else {
            throw {
                status: 401,
                message: "you are not authorized to access this todo"
            }
        }
    } catch(err) {
        next(err)
    }
}
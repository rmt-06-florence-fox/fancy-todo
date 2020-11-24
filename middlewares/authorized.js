const { Todo } = require('../models/index')

module.exports = async (req, res, next) => {
    try {
        const todo = await Todo.findOne({where: {id: Number(req.params.id), UserId: req.loggedInUser.id}})
        if (todo) {
            next()
        } else {
            throw{
                status: 401,
                message: `You aren't authorized`
            }
        }
    } catch (error) {
        next(error)
    }
}
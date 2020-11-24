const { ToDo } = require('../models')

module.exports = async (req, res, next) => {

    try {
        const todoId = req.params.id
        const userId = req.loggedInUser.id
        const todo = await ToDo.findOne({
            where: {
                id: todoId
            }
        })
        if(todo.UserId == userId) {
            next()
        }
        else {
            res.status(401).json({
                message: 'You are not authorized'
            })
        }
    }
    catch (err) {
        res.status(500).json({message: 'Internal server error' })
    }
}
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
            res.status(401).json({
                message : "You are not authorized"
            })
        }

    } catch (error) {
        res.status(500).json({ message : "Internal Server Error"})
        
    }

}
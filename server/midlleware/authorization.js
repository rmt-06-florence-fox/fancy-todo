const { Todo } = require('../models')

module.exports = async (req, res, next) => {
    try {
        const todo = await Todo.findOne({
            where: {
                id: req.params.id
            }
        })
        if(todo.UserId === req.loggedUser.id) {
            next()
        } else {
            res.status(401).json({msg: "you are not authorized to access this todo!"})
        }
    } catch (error) {
        res.status(500).json({msg: "internal server error"})
    }

}

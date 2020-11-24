const { Todo } = require('../models')

module.exports = async (req, res, next) => {
    console.log(`authorize`);
    try {
        const todo = await Todo.findOne({
            where: {
                id:req.params.id
            }
        })
        // console.log(todo);
        if (req.loggedIn.id == todo.UserId) {
            next()
        } else {
            res.status(401).json({message: `you're not authorized to access this todo`})
        }
    } catch (error) {
        res.status(500).json({message: `internal server error`})
    }
}
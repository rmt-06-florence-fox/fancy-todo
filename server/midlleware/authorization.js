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
            throw({status: 401,
                  message: "you are not authorized to access this todo!"})
        }
    } catch (error) {
        // console.log(error);
        next(error)
    }

}

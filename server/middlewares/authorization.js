const { Todo } = require('../models')

module.exports = async (req, res, next) => {
    console.log(`authorize`);
    try {
        const todo = await Todo.findOne({
            where: {
                id:req.params.id
            }
        })
        if (!todo) {
            throw {
                message: `Error Not Found`,
                status: 404
            }
        } else if (req.loggedIn.id == todo.UserId) {
            next()
        } else {
            throw {
                status: 401,
                message: `you're not authorized to access this todo`
            }
        }
    } catch (error) {
        next(error)
    }
}
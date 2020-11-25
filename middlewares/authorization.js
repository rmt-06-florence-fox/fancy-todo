const { Todo } = require('../models');

module.exports = async (req,res,next) => {
    try {
        const todo = await Todo.findOne({
            where: {
                id: req.params.id
            }
        })
        //console.log(todo)
        if(todo.UserId === req.loggedInUser.id) {
            next()
        } else {
            throw {
                status: 401,
                message: 'not authorized'
            }
        }
    } catch (err) {
        next(err)
    }
}
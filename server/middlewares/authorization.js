const { Todo } = require("../models")

module.exports = async (req, res, next) => {
    try {
        console.log("masuk authorized");
        const todo = await Todo.findOne({
            where: {
                id: req.params.id
            }
        })
        if (!todo) {
            throw {
                status: 404,
                message: "error not found"
            }
        } else {
            if (todo.UserId === req.loggedInUser.id) {
                console.log("authorized");
                next()
            } else {
                throw {
                    status: 401,
                    message: "sory, you are not authorized to access this page"
                }
            } 
        }
    } catch (err) {
        next(err)
    }
}
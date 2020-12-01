const { Todo } = require("../models")

module.exports = async (req, res, next) => {

    const id = req.params.id

    Todo.findOne({
        where: {
            id
        }
    })
        .then(data => {
            if (data.UserId === req.logInUser.id) {
                next()
            } else {
                next({
                    name: "Authorized"
                })
            }
        })
        .catch(err => {
            next(err)
        })
}
const { Todo } = require("../models")

module.exports = async (req, res, next) => {
    // console.log("autorized")
    // console.log(req.params.id)
    
    try {
        const todo = await Todo.findOne({
            where: {
                id: req.params.id
            }
        })
        // console.log(todo.UserId)
        // console.log(req.logInUser.id)
        if (todo.UserId === req.logInUser.id) {
            next()
        } else {
            res.status(401).json({
                msg: "You Are Not Autorize"
            })
        }    
    } catch (err) {
        res.status(500).json(err)
    }
}
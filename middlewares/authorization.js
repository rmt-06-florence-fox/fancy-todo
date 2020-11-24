const { Todo } = require("../models")

module.exports = async (req, res, next) => {
    try {
        console.log("masuk authorized");
        const user = await Todo.findOne({
            where: {
                id: req.params.id
            }
        })
        if (user.UserId === req.loggedInUser.id) {
            console.log("authorized");
            next()
        } else {
            res.status(401).json({
                message: "sory, you are not authorized to access this page"
            })
        }
    } catch (error) {
        res.status(500).json(error)
    }
}
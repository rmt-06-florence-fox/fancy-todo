const { Todo } = require('../models')

module.exports = async (req, res, next) => {
    try {
        const data = await Todo.findOne({
            where: {
                id: req.params.id
            }
        })
        if(data.UserId === req.signInUser.id) {
            next()
        } else {
            res.status(401).json({ message: "You are not authorized to access"})
        }
    } catch(error) {
        res.status(500).json(error)
    }
}
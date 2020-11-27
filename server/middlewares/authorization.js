const { Todo } = require('../models')

module.exports = async (req, res, next) => {
    try {
        const data = await Todo.findOne({
            where: {
                id: req.params.id
            }
        })
        if(!data) {
            throw {
                status: 404,
                message: "Data not found!"
            }
        } else if (data.UserId === req.signInUser.id) {
            next()
        } else {
            throw {
                status: 401,
                message: "You are not authorized to access!"
            }
        }
    } catch (err) {
        next(err)
    }
}
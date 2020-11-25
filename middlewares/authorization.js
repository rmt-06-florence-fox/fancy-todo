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
            res.status(401).json({message: 'not authorized'});
        }
    } catch (err) {
        console.log(err);
        res.status(401).json({
            message: "authorization: didn't match any token"
        })
    }
}
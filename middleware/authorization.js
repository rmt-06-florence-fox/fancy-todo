const {Todo} = require('../models/index')

module.exports = async (req, res, next) => {
    try {
        const data = await Todo.findOne({
            where: {
                id: req.params.id
            }
        })
        if(data.UserId == req.userLoggedIn.id){
            next()
        } else {
            res.status(401).json({message: "you are not authorized"})
        }
    } catch (error) {
        res.status(404).json({message: `error not found`})
    }
   
}
const {Todo} = require('../models/index')

module.exports = async (req, res, next) => {
    try {
        const data = await Todo.findOne({
            where: {
                id: req.params.id
            }
        })
        if(!data){
            throw({
                status: 404,
                message: `error not found`
            })
        }
        if(data.UserId == req.userLoggedIn.id){
            next()
        } else {
            throw({
                status: 401,
                message: 'you are not authorized'
            })
            // res.status(401).json({message: "you are not authorized"})
        }
    } catch (err) {
        next(err)
    }
   
}
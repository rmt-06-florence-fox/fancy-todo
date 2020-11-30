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
            console.log(`masuk sini kah?`)
            throw({
                status: 401,
                message: 'you are not authorized'
            })
        }
    } catch (err) {
        next(err)
    }
   
}
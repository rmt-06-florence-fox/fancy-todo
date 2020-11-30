const { TodoList } = require('../models/index');

module.exports = async (req, res, next) => {
    try {
        const list = await TodoList.findOne ({
            where: {
                id: req.params.id
            }
        })

        if (list.UserId == req.loggedUser.id) {
            next ()
        } else {
            throw {status: 401, message: `Not Authorized`}
        }

    } catch (err) {
         next(err)
    }
}
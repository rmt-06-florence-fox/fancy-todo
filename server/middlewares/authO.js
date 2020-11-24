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
        }

    } catch (err) {
         res.status(500).json({message: `Not Authorized`})
    }
}
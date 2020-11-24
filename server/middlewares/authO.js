const { TodoList } = require('../models/index');

module.exports = async (req, res, next) => {
    try {
        const list = await TodoList.findOne ({
            where: {
                id: req.loggedUser.id
            }
        })

        if (list.UserId) {
            next ()
        }

    } catch (err) {
        res.status(500).json({message: `Not Authorized`})
    }
}
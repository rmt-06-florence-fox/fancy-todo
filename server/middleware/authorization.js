const { ToDo } = require('../models');

module.exports = async (req, res, next) => {
  try {
    const data = await ToDo.findOne({
      where: {
        id: req.params.id,
        UserId: req.loggedUser.id
      }
    })
    if (data) {
      next()
    } else {
      throw {
        status: 401,
        message: 'You are not authorized to access this feature !'
      }
    }
  }
  catch (err) {
    next(err)
  }
}
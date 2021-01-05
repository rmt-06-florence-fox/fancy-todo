async function errorHandler (err, req, res, next) {
  if (err.status) {
    res.status(err.status).json({
      message: err.message
    })
  } else if (err.name === 'SequelizeUniqueConstraintError') {
    res.status(400).json({message: `Invalid Email / Password !`})
  } else if (err.name === 'SequelizeValidationError' || err.name === 'ValidationError') {
    // console.log(err, '<-- err eror handler validation')
    let error = err.errors.map(element => {
      return element.message
    });
    // console.log(error, '<-- hasil map dari errorhandler')
    res.status(400).json({ error })
  } else {
    console.log(err, '<== else dari errorhandler')
    res.status(500).json({ message: `Internal Server Error !`})
  }
}

module.exports = errorHandler
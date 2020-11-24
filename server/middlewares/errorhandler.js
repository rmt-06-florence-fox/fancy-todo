module.exports = (err, req, res, next) => {
  if (err.status) res.status(err.status).json({ message: err.message })
  else if (err.name === 'SequelizeValidationError') {
    const errors = err.errors.map((e) => e.message)
    res.status(400).json({ message: errors })
  }
  else {
    console.log(err)
    res.status(500).json({ message: "Internal server error" })
  }
}
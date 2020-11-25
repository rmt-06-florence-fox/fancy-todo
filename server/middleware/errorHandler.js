module.exports = (err,req,res,next) => {
  // console.log(err);
  if (err.status) {
    res.status(err.status).json(err.message)
  } else if (err.name === `SequelizeValidationError`) {
    let errorsSeq = err.errors.map(e => e.message)
    res.status(400).json({ message: errorsSeq })
  } else if (err.name === `SequelizeUniqueConstraintError`) {
    const seqErrors = err.errors.map(e => e.message)
    res.status(400).json({ message: seqErrors })
  } else {
    res.status(500).json({ message: 'internal server error' })
  }
}
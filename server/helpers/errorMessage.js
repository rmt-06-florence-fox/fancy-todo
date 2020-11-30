const errorMessage = (err) => {
  const errorMessage = []
  err.errors.forEach(el => {
    errorMessage.push(el.message)
  })
  return errorMessage.join(', ')
}

module.exports = errorMessage
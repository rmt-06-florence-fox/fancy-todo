const jwt = require('jsonwebtoken')

let makeToken = (value) =>{
  return jwt.sign({
    id : value.id, 
    first_name : value.first_name,
    last_name : value.last_name,
    email : value.email},
    process.env.SECRET
    )
}

let makeDecode = (value) => {
  return jwt.verify(value, process.env.SECRET)
}

module.exports = {makeToken, makeDecode}
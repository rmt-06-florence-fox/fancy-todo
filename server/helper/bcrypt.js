const bcrypt = require('bcryptjs')

let goHash = (words) => {
  let salt = bcrypt.genSaltSync(10);
  return bcrypt.hashSync(words, salt);
}

let compare = (words, hashed) => {
  return bcrypt.compareSync(words, hashed);
}

module.exports = {goHash,compare}
const bcrypt = require("bcryptjs")

function comparePassword(inputPassword, databasePassword){
  return bcrypt.compareSync(inputPassword, databasePassword);
}

module.exports = comparePassword
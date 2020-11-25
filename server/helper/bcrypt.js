const bcrypt = require('bcryptjs')

function checker(dataInput, dataCurrent)  {
    return bcrypt.compareSync(dataInput, dataCurrent)
}

module.exports = checker
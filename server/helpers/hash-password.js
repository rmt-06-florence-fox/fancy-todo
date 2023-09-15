const bcrypt = require('bcryptjs');

class Password {
    static hashPassword(input) {
        const salt = +process.env.SALT
        return bcrypt.hashSync(input, salt); // ? hash password
    }

    static comparePassword(input, hash) {
        return bcrypt.compareSync(input, hash) // ? true or false
    }
}


// console.log(Password.hashPassword(`Test Hash`));
// console.log(Password.comparePassword(`Test Hash`, `$2a$10$cVrUoqvQMFSz3NtNW1KghuYDpsy5M4cCXvlJyet.qjdNtCNHN7/s6`))

module.exports = Password
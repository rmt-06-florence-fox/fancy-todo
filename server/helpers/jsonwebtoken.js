const jwt = require('jsonwebtoken');
class Token {
    static getToken(obj) {
        return jwt.sign(obj, process.env.SECRET); // ? output string token
    }

    static verifyToken(token) {
        return jwt.verify(token, process.env.SECRET); // ? output object
    }
}

// console.log(Token.getToken({id:1, email:'jalu@mail.com'}));
// console.log(Token.verifyToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZW1haWwiOiJqYWx1QG1haWwuY29tIiwiaWF0IjoxNjA2MTkzNjE3fQ.ABoDh1MKh1yQQldXs7KaA061SRM6Vr501Sa8qcDACnE'));

module.exports = Token
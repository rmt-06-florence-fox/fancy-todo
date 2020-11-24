const {checkPassword, generatePassword} = require('./helpers/bcrypt');

let a = generatePassword('tuyetuye');
let b = 'tuyetuya';

console.log(true && checkPassword(b, a));
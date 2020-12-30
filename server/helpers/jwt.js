
const jwt = require('jsonwebtoken');


function sign(data){
   console.log(process.env.SECRET)
   return jwt.sign({id:data.id,email:data.email},process.env.SECRET)
}

function verify(token){
   return jwt.verify(token,process.env.SECRET);
}

module.exports = {sign,verify}
const bcrypt= require('bcryptjs')

function hashPassword(plainPassword) {
  const salt=bcrypt.genSaltSync(12);
  const hash=bcrypt.hashSync(plainPassword,salt);

  return hash;
  
}

function checkPassword(plain,hashed) {

  return bcrypt.compareSync(plain,hashed)
  
}

module.exports= {hashPassword, checkPassword}

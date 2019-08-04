const bcrypt = require('bcrypt');

module.exports = {

  // return hashed password
  async hashPassword(password) {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
  },

  // compare hash_password with the given password
  async comparePassword(password, passwordHash){
    return await bcrypt.compare(password, passwordHash);
  }

}

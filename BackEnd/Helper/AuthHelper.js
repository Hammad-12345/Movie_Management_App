const brcypt =  require('bcrypt')

const hashPassword = async (password) => {
  try {
    const saltRound = 10;
    const hashed = await brcypt.hash(password, saltRound);
    return hashed;
  } catch (error) {
    console.log(`error in hashing ${error}`);
  }
};

const comparePassword = async (password, hashed) => {
    try {
        console.log(password)
        console.log(hashed)
      return brcypt.compare(password, hashed);
    } catch (error) {}
  };
  
  module.exports = { hashPassword,comparePassword };
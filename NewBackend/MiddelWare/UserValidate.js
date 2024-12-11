const JWT = require("jsonwebtoken");

//protected routes token based for users

const uservalidate = async (req, res, next) => {
  try {
    // console.log(req.headers.authorization)
    const token= req.headers.authorization.split(" ")[1]
    const decode = JWT.verify(req.headers.authorization.split(" ")[1],
      process.env.JWT_SECRET_KEY
    );
    // req.user = decode;
    next();
  } catch (error) {
    console.log(error);
  }
};
module.exports = { uservalidate };
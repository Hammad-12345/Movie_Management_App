const { hashPassword,comparePassword } = require("../../../Helper/AuthHelper");
const Signupschema = require("../../model/UserSchema/RegisterSchema");
const JWT = require("jsonwebtoken");
const UserRegister = async (req, res) => {
  // get data from form

  const { name, email, password } = req.body;

  //   calling hasing function

  const hashedpassword = await hashPassword(password);
  try {
    const user = await new Signupschema({
      name,
      email,
      password: hashedpassword,
    }).save();
    if (user) {
      res.send({ message: "user register successfully", status: 200 });
    }
  } catch (error) {
    if (error.code === 11000) {
      // MongoDB duplicate key error code
      res.send({
        error: "Email already exists",
        status: 409,
      });
    } else {
      res.status(500).send({
        error: error.errmsg || "An unexpected error occurred.",
      });
    }
  }
};
const UserLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Signupschema.findOne({ email });
    console.log(user);
    if(user)
    {
        const match = await comparePassword(password, user.password);
        if(match)
        {
          const token = JWT.sign({ _id: user._id }, process.env.JWT_SECRET_KEY, {
            expiresIn: "7d",
          });
            res.send({
                message:"User Found Successfully",
                status:200,
                user,
                token

            })
        }
        else 
        {
            res.send({
                message:"Password Does Not Match",
                status: 401,

            })
        }
        console.log(match)
        console.log(user)
    }
    else 
    {
        res.send({
            success: 404,
            message: "user not found",
          });
        console.log(user)
    }
  } catch (error) {}
};

module.exports = { UserRegister, UserLogin };

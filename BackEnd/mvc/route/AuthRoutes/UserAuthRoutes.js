const express = require("express");
const userrouter = express.Router()
const { UserRegister,UserLogin } = require('../../controller/Authcontroller/UserAuthcontroller') 

// User Register Api
userrouter.post('/Register',UserRegister)

userrouter.post('/Login',UserLogin)

module.exports = { userrouter }
const bcrypt = require("bcryptjs")
const { request } = require("express")
const jwt = require("jsonwebtoken")
const User = require("../models/users.model")
const db = require("../config/dbConfig")
const { createError } = require("../utils/error")
const userService = require("../services/user.service")
const authService = require("../services/auth.service")

const registerUser =  (userData,done)=>{
        userService.registerUser(userData,done)
}


const loginUser =  ({email,password},done)=>{
    userService.findUser(email,(err,userFound)=>{
        if(err){
          done(err)
        }else{
          const userVerified = authService.verifyUser({email, password},userFound)
          if (userVerified){
            const jwtToken = authService.createJWT(userFound)
            done(undefined,jwtToken)
          }else{
            done({error: "User not verified"})
          }
        }
      })
}



module.exports = { registerUser,loginUser }
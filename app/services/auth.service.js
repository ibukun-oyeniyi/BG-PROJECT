

//import jsonwebtoken and config file
const jwt = require("jsonwebtoken")
const config = require("../config/dbConfig")
const bcrypt = require("bcryptjs")

//This function will verify email and password and will return true and false



function verifyUser({email,password},userData){
   if(userData===undefined){
      return false
   }
   else {
      const isPasswordCorrect = bcrypt.compareSync(password, userData.password)
      if (!isPasswordCorrect) return false
      else{
        return true;
      } 
   }
    
  
}

//This function will create JWT token and return the token
// use the method jwt.sign having two parameters payload and Auth_Secret
function createJWT(userdata) {
  //create payload
  const payload = {
    role: userdata.role,
    id: userdata.id,
    email: userdata.email,
    username: userdata.username
  }
   const token = jwt.sign(payload, process.env.AUTH_SECRET || "secret",{
    expiresIn: 3600
   })
   
    return token;
  }


  module.exports={
    verifyUser,createJWT
  }
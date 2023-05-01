const bcrypt = require("bcryptjs")

function getUserDetails(userData){
    console.log(userData);
    const salt = bcrypt.genSaltSync(10)
    const hashedPassword = bcrypt.hashSync(userData.password, salt)
    
    const info = {
        email: userData.email,
        role: userData.role,
        password: hashedPassword,
    }
    return info
}

module.exports={
    getUserDetails
  }
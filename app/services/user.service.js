const userDao = require("../dao/user.Dao")

const findUser =  (email,done)=>{
    //call the userdao finduser method
    userDao.findUser(email,done)
}

const getAllUsers =  (done) => {
    userDao.getAllUsers(done);
      
}

const verifyUser =  (userId, done) => {
    userDao.verifyUser(userId,done);  
}

// const getUsers = (userId,limit,done)=>{
//     taskDao.getTasks(userId,limit,done)
// }


const deleteUser = (userId,done)=>{
    userDao.deleteUser(taskId,done)
}

const registerUser= (userData,done)=>{
    //call the userdao finduser method
    userDao.registerUser(userData,done)
}

module.exports={
    findUser,registerUser,getAllUsers,verifyUser,deleteUser
}
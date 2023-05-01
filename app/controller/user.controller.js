const db = require("../config/dbConfig")
const { createError } = require("../utils/error")
const userService = require("../services/user.service")

const getAllUsers =  (done) => {
    userService.getAllUsers(done);
      
}

const verifyUser =  (userId, done) => {
    userService.verifyUser(userId,done);  
}

// const getUsers = (userId,limit,done)=>{
//     taskService.getTasks(userId,limit,done)
// }


// const deleteUser = (userId,done)=>{
//     userService.deleteUser(taskId,done)
// }

// const deleteTodoList = (userId,todolistId,done)=>{
//     todoService.deleteTodoList(userId,todolistId,done)
// }

module.exports = { getAllUsers,verifyUser}
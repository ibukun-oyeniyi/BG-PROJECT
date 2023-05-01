const operatorDao = require("../dao/operator.dao")

const createOperator = async (operatorData, done)=>{
    //call the todoListdao findtodoList method
    operatorDao.createOperator(operatorData, done)
}

const getDetails = async (userId, done)=>{
    //call the todoListdao findtodoList method
    operatorDao.getDetails(userId, done)
}

module.exports={
    createOperator,getDetails
}
const operatorDao = require("../dao/operator.dao")

const createOperator = async (operatorData, done)=>{
    //call the todoListdao findtodoList method
    operatorDao.createOperator(operatorData, done)
}

const getDetails = async (userId, done)=>{
    //call the todoListdao findtodoList method
    operatorDao.getDetails(userId, done)
}

const registerFieldOfficer = async (fieldOfficerData, done)=>{
    //call the todoListdao findtodoList method
    operatorDao.registerFieldOfficer(fieldOfficerData, done)
}

const getUnregisteredFieldOfficers = async (done)=>{
    //call the todoListdao findtodoList method
    operatorDao.getUnregisteredFieldOfficers(done)
}

module.exports={
    createOperator,getDetails,registerFieldOfficer,getUnregisteredFieldOfficers
}
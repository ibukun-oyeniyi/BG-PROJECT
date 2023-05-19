const operatorService = require("../services/operator.service")

const createOperator = async (operatorData, done)=>{
    operatorService.createOperator(operatorData, done)
}

const getDetails = async (userId, done)=>{
    operatorService.getDetails(userId, done)
}

const registerFieldOfficer = async (operatorData, done)=>{
    operatorService.registerFieldOfficer(operatorData, done)
}

const getUnregisteredFieldOfficers = async (done) =>{
    operatorService.getUnregisteredFieldOfficers(done)
}

module.exports={
    createOperator,getDetails,registerFieldOfficer,getUnregisteredFieldOfficers
}
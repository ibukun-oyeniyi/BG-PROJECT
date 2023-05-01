const operatorService = require("../services/operator.service")

const createOperator = async (operatorData, done)=>{
    operatorService.createOperator(operatorData, done)
}

const getDetails = async (userId, done)=>{
    operatorService.getDetails(userId, done)
}

module.exports={
    createOperator,getDetails
}
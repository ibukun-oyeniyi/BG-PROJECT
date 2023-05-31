const adminService = require("../services/admin.service")

const getFieldOfficers = async (done)=>{
    adminService.getFieldOfficers(done)
}

const getFieldOfficerById = async (operatorId,done)=>{
    adminService.getFieldOfficerById(operatorId,done)
}

const startTestSession = async (userId,done)=>{
    adminService.startTestSession(userId,done)
}

const submitAnswer = async (sessionId,answerData,done)=>{
    adminService.submitAnswer(sessionId,answerData,done)
}


module.exports={
    getFieldOfficerById,getFieldOfficers,startTestSession,submitAnswer
}
const adminService = require("../services/admin.service")

const getFieldOfficers = async (done)=>{
    adminService.getFieldOfficers(done)
}

const getFieldOfficerById = async (operatorId,done)=>{
    adminService.getFieldOfficerById(operatorId,done)
}


module.exports={
    getFieldOfficerById,getFieldOfficers
}
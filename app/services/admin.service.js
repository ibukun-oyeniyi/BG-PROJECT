const adminDao = require("../dao/admin.dao")

function transformResult(result) {
  const transformedResult = [];

  // Iterate over each entry in the original result
  for (const entry of result) {
    const { operatorId, field_officers, ...rest } = entry;

    // Check if the operatorId already exists in the transformedResult
    const existingEntry = transformedResult.find((item) => item.operatorId === operatorId);

    // If the operatorId exists, push the field_officers to the existing entry
    if (existingEntry) {
      existingEntry.field_officers.push(...field_officers);
    } else {
      // If the operatorId doesn't exist, create a new entry in the transformedResult
      transformedResult.push({ operatorId, field_officers });
    }
  }

  return transformedResult;
}

const getFieldOfficers = async (done)=>{
    await adminDao.getFieldOfficers((err,result)=>{
        if (err){
            return done(err)
        }
        const final = transformResult(result)
        done(undefined,final)
    })
}

const getFieldOfficerById = async (operatorId,done)=>{
    adminDao.getFieldOfficerById(operatorId,done)
}


module.exports={
    getFieldOfficerById,getFieldOfficers
}
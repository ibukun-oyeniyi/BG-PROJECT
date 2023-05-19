const db = require("../config/dbConfig")
const {getUserDetails} = require("../utils/hashpassword")
const { Op } = require('sequelize');

const getFieldOfficers = async (done) => {
try {
    const operators = await db.operator.findAll({
        include: [
          {
            model: db.field_officer,
            attributes: ['id',"firstName","lastName"],
            raw: true
          },
        ],
      });

    const response = {};
    operators.forEach((operator) => {
      response[operator.operatorId] = operator.field_officers.map((fieldOfficer) => {
        {fieldOfficer.firstName,fieldOfficer.lastName,fieldOfficer.id,fieldOfficer.fieldOfficerId}
    });
    });
    done(undefined,operators)


    
} catch (err) {
    console.log(err);
    done("Error getting operator");
}
};

const getFieldOfficerById = async (operatorId,done) => {
    try {
        const operators = await db.operator.findOne({
            where: {id:operatorId},
            include: [
              {
                model: db.field_officer,
                attributes: ['fieldOfficerId',"firstName","lastName"],
                raw: true
              },
            ],
            attributes: ['operatorId']
          });
        
        done(undefined,operators)
    
    
        
    } catch (err) {
        console.log(err);
        done("Error getting operator");
    }
    };
    
module.exports = {
    getFieldOfficers,getFieldOfficerById
}
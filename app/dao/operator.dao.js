const db = require("../config/dbConfig")
const {getUserDetails} = require("../utils/hashpassword")
const { Op } = require('sequelize');

const createOperator = async (operatorData, done) => {
    try {
        const existingOperator = await db.operator.findOne({ where: { userId: operatorData.userId } });
        if (existingOperator) {
        await db.operator.destroy({ where: { userId: operatorData.userId } });
        }
      // Convert the first letter of each word in the operatorData.state input to uppercase
      const stateName = operatorData.state.toLowerCase().replace(/\b\w/g, (match) => match.toUpperCase());

      // Query the state table using the capitalized state name
      const state = await db.state.findOne({
        where: { name: stateName },
      });
      if (state.isDisabled){
        return done("You are not permitted to add this state");
      }

      const [lga, createdLga] = await db.lga.findOrCreate({
        where: { name: operatorData.lga },
        defaults: { stateId: state.id }
      });

      const maxOperator = await db.operator.max('id');
      console.log(typeof(maxOperator))
      let newId = (maxOperator ? maxOperator + 1 : 1);
        let operatorId = `OP-${newId.toString().padStart(6, '0')}`;
        while (await db.operator.findOne({ where: { operatorId } })) {
        newId++;
        operatorId = `OP-${newId.toString().padStart(6, '0')}`;
        }
      // Create a new operator row in the operators table with the specified user_id, state_id, and local_government_area_id
      operatorData["stateId"] = state.id
      operatorData["lgaId"] = lga.id
      operatorData['operatorId'] = operatorId

      const operator = await db.operator.create(operatorData);
      const response = {
        operatorId: operator.operatorId,
        firstName: operator.firstName,
        lastName: operator.lastName,
        phone:operator.phone,
        sex:operator.sex,
        nin:operator.nin,
        nationality:operator.nationality,
        state: operatorData.state,
        lga: operatorData.lga
      };
      done(undefined, response);
    } catch (err) {
      console.log(err);
      done("Error creating operator");
    }
  };

  const registerFieldOfficer = async (fieldOfficerData, done) => {
    try {
        
      // Convert the first letter of each word in the operatorData.state input to uppercase
      const stateName = fieldOfficerData.state.toLowerCase().replace(/\b\w/g, (match) => match.toUpperCase());

      // Query the state table using the capitalized state name
      const state = await db.state.findOne({
        where: { name: stateName },
      });
      if (state.isDisabled){
        return done("You are not permitted to add this state");
      }

      const [lga, createdLga] = await db.lga.findOrCreate({
        where: { name: fieldOfficerData.lga },
        defaults: { stateId: state.id }
      });

      //get operator_id -- add condition to be sure it finds
      const operatorId = await db.operator.findOne({
        where: { userId: fieldOfficerData.userId },
      });

      const userId = fieldOfficerData.field_officer_id


      // Create a new field officer row in the field officer table with the specified user_id, state_id, and local_government_area_id
      fieldOfficerData["stateId"] = state.id
      fieldOfficerData["lgaId"] = lga.id
      fieldOfficerData['operatorId'] = operatorId.id
      fieldOfficerData['userId'] = userId
      const field_officer = await db.field_officer.create(fieldOfficerData);
      const response = {
        firstName: field_officer.firstName,
        lastName: field_officer.lastName,
        phone:field_officer.phone,
        sex:field_officer.sex,
        nin:field_officer.nin,
        nationality:field_officer.nationality,
        state: state.name,
        lga: lga.name
      };
      done(undefined, response);
    } catch (err) {
      console.log(err);
      done("Error creating operator");
    }
  };
  
  const getDetails = async (userId, done) => {
    try {
        const existingOperator = await db.operator.findOne({ where: { userId: userId } });
        if (existingOperator){
            done(undefined, existingOperator);
        }
        else{
            done("operator Details not found",null)
        }
       
    } catch (err) {
      console.log(err);
      done("Error getting operator");
    }
  };

  const getUnregisteredFieldOfficers = async (done) => {
    try {
        const registeredFieldOfficers = await db.field_officer.findAll({
          attributes: ['userId'],
          raw: true
        });
    
        const registeredUserIds = registeredFieldOfficers.map((fieldOfficer) => fieldOfficer.userId);
    
        const fieldOfficers = await db.user.findAll({
          where: {
            role: 'field_officer',
            id: {
              [db.Sequelize.Op.notIn]: registeredUserIds
            }
          }
        });
        done(undefined,fieldOfficers)


       
    } catch (err) {
      console.log(err);
      done("Error getting operator");
    }
  };


module.exports = {
    createOperator,getDetails,registerFieldOfficer,getUnregisteredFieldOfficers
}
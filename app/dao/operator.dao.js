const db = require("../config/dbConfig")
const {getUserDetails} = require("../utils/hashpassword")

const createOperator = async (operatorData, done) => {
    try {
        const existingOperator = await db.operator.findOne({ where: { userId: operatorData.userId } });
        if (existingOperator) {
        await db.operator.destroy({ where: { userId: operatorData.userId } });
        }
      // Find the state and local government area rows, or create them if they don't exist
      const [state, createdState] = await db.state.findOrCreate({
        where: { name: operatorData.state },
      });
      const [lga, createdLga] = await db.lga.findOrCreate({
        where: { name: operatorData.lga },
        defaults: { stateId: state.id }
      });
  
      // Create a new operator row in the operators table with the specified user_id, state_id, and local_government_area_id
      operatorData["stateId"] = state.id
      operatorData["lgaId"] = lga.id
      const operator = await db.operator.create(operatorData);
      done(undefined, operator);
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


module.exports = {
    createOperator,getDetails
}
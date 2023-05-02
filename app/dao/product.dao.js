const db = require("../config/dbConfig")
const {getUserDetails} = require("../utils/hashpassword")

const createProduct = async (productData, done) => {
    try {
      // Find the if seed exists
      const [seed, createdSeed] = await db.seed.findOrCreate({
        where: { seedName: productData.seedName },
      });
      
  
      // Create a new operator row in the operators table with the specified user_id, state_id, and local_government_area_id
      productData["seedId"] = seed.id
      const product = await db.product.create(productData);
      done(undefined, product);
    } catch (err) {
      console.log(err);
      done("Error creating product");
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
    createProduct,getDetails
}
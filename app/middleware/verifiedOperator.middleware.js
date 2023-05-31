const db = require("../config/dbConfig")
const verifiedOperator = async (req, res, next) => {
    try {
      if (!req.user){
        return res.status(401).json("You are not logged in")
      }
      const existingOperator = await db.operator.findOne({ where: { userId: req.user.id } });
      if (existingOperator && existingOperator.verified === true) {
        next();
      } else {
        res.status(401).json("You need to be a verified operator to do this");
      }
    } catch (err) {
      console.log(err);
      res.status(500).json("Error checking operator verification status");
    }
  };

module.exports = { verifiedOperator }

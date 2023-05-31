const jwt = require("jsonwebtoken")
const { createError } = require("../utils/error")

//Verifying the token generated in the login Page
const verifyToken = async (req, res, next) => {
    console.log("user")
    const authHeader = req.headers.authorization
    if (authHeader) {
        const token = authHeader.split(" ")[1]
        jwt.verify(
            token,
            process.env.AUTH_SECRET || "secret",
            (err, user) => {
                if (err) return next(createError(403, "Your Token is Invalid"))
                req.user = user
                next();
            }
        );
    } else {
        res.status(401).json("You are not Authorized yet")
    }
}

//Verifying the User after verifying the token
const verifyOperator = async (req, res, next) => {
    verifyToken(req, res, () => {
        try{
            if (req.user && req.user.id === parseInt(req.params.userId) && req.user.role === "operator") {
                next();
            } 
             else {
                res.status(401).json("You are not Authorized to do this")
            }
        }catch(err){
            res.status(400).json("user obj not found")
        }       
    })
}

const verifyAdmin = async (req, res, next) => {
    verifyToken(req, res, () => {
      if (req.user && req.user.role && req.user.role === "admin") {
        next();
      } else {
        res.status(200).json("You are not an Admin, so you are not Authorized to do this");
      }
    });
  };




module.exports = { verifyToken, verifyOperator,verifyAdmin }

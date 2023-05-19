const express = require('express')
const userController = require('../controller/user.controller')
const authController = require('../controller/auth.controller')
const adminController = require('../controller/admin.controller')
const dotenv = require('dotenv');
const {validateRegister} = require("../middleware/validateRegister.middleware")
const { verifyUser, verifyAdmin } = require('../middleware/auth.middleware')
const router = express.Router()

dotenv.config();
router.post('/auth/register',validateRegister,(req,res)=>{
  try{
      const {email, password,secret_password} = req.body
      if(secret_password != process.env.PASSWORD){
        return res.status(400).send({error:'secret password is incorrect'})
      }
      const role = "admin"
      // Add secret password --->
      const userDetails = {
          email,password,role
      }
      authController.registerUser(userDetails,(err,result) =>{
          if (err){
                  return res.status(400).send({error: 'User Already Exists 2'})
          }else{
                  return res.status(201).send(result)
          }
      })
  }catch(err){
          res.status(400).send({error:'Unexpected error while registering the user'})
  }
})

router.post("/auth/login",(req,res)=>{
  try{
      //retrive email and password from req.body
      const {email, password} = req.body
      if(!(email && password)){
              return res.status(400).send('Required inputs are missing')
      } 
      //calling the authController login usermethod return the error or the result 
      authController.loginUser({email,password},(err,result)=>{
          if (err){
                  return res.status(401).send({error: 'Invalid Credentials'})
          }else{
                  return res.status(200).send({STATUS:"OK",data:result})
          }
      })}catch(err){
              res.status(500).send({error:'Unexpected error while registering the user'})
      }
})

//GET ALL USERS INFORMATION
router.get('/users', verifyAdmin, (req, res) => {
    try {
      userController.getAllUsers((err, result) => {
        if (err) {
          return res.status(400).send({ error: 'Error getting users' })
        } else {
          return res.status(200).send(result)
        }
      })
    } catch (err) {
      res.status(400).send({ error: 'Unexpected error while getting users' })
    }
  })

//GET AN OPERATOR INFORMATION
router.get('/user/:userId', verifyAdmin, (req, res) => {
    const userId = parseInt(req.params.userId)
    try {
      userController.getAllUsers((err, result) => {
        if (err) {
          return res.status(400).send({ error: 'Error getting users' })
        } else {
          return res.status(200).send(result)
        }
      })
    } catch (err) {
      res.status(400).send({ error: 'Unexpected error while getting users' })
    }
  })

//VERIFY A USER
router.post('/verify/:operatorId', verifyAdmin, (req, res) => {
    const operatorId = parseInt(req.params.operatorId)
    try {
      userController.verifyUser(operatorId,(err, result) => {
        if (err) {
          return res.status(400).send({ error: err })
        } else {
          return res.status(200).send(result)
        }
      })
    } catch (err) {
      res.status(400).send({ error: 'Unexpected error while verifying the user' })
    }
  })

//GET ALL OPERATORS WITH THEIR FIELD OFFICERS
router.get('/:userId/field-officers', verifyAdmin, (req, res) => {
  try {
    adminController.getFieldOfficers((err, result) => {
      if (err) {
        return res.status(400).send({ error: err })
      } else {
        return res.status(200).send(result)
      }
    })
  } catch (err) {
    res.status(400).send({ error: 'Unexpected error while verifying the user' })
  }
})

//GET ALL SPECIFIC FIELD OFFICERS UNDER AN OPERATOR
router.get('/:userId/:operatorId/field-officers', verifyAdmin, (req, res) => {
  const operatorId = parseInt(req.params.userId)
  try {
      adminController.getFieldOfficerById(operatorId,(err, result) => {
      if (err) {
        return res.status(400).send({ error: err })
      } else {
        return res.status(200).send(result)
      }
    })
  } catch (err) {
    res.status(400).send({ error: 'Unexpected error while verifying the user' })
  }
})



module.exports = router
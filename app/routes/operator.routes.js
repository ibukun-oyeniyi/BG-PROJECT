const express = require('express')
const operatorController = require('../controller/operator.controller')
const {verifyOperator} = require("../middleware/auth.middleware")
const {validateRegister} = require("../middleware/validateRegister.middleware")
const authController = require('../controller/auth.controller')
const {validateFieldOfficerData} = require("../middleware/validateFieldOfficerData.middleware")
const router = express.Router()
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads");
    },
    filename: (req, file, cb) => {
      cb(null, 'tgtemplate' + '-' + Date.now() + '.png');
    },
});
const upload = multer({ storage: storage})
const bodyParser = require('body-parser');
const {validateOperatorData} = require("../middleware/validateOperatorData.middleware")

router.post('/auth/register',validateRegister,(req,res)=>{
    try{
        const {email, password} = req.body
        const role = "operator"
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

  
router.get('/:userId/view',verifyOperator,async (req,res)=>{
    try{
        const userId = parseInt(req.params.userId)
        operatorController.getDetails(userId,(err,result) =>{
            if (err){
                    return res.status(400).send({error: 'Error getting Operator Details'})
            }else{
                    return res.status(201).send(result)
            }
        })
    }catch(err){
            res.status(400).send({error:'Unexpected error while submitting operator details'})
    }
})

router.post('/:userId/submit',verifyOperator,upload.single('file'), bodyParser.urlencoded({ extended: true }),validateOperatorData,async (req,res)=>{
    try{
        if(req.file){
        req.body.userPicture = req.file.filename
        }
        else{
            return res.status(400).send({error: 'Upload your Profile Pic'})
        }
        const userId = parseInt(req.params.userId)
        req.body["userId"] = userId 
        console.log(req.body)
        operatorController.createOperator(req.body,(err,result) =>{
            if (err){
                    return res.status(400).send({error: 'Error submitting Operator Details'})
            }else{
                    return res.status(201).send(result)
            }
        })
    }catch(err){
            res.status(400).send({error:'Unexpected error while submitting operator details'})
    }
})
//Endpoint to register Field Officer
router.post('/:userId/register/field-officer',verifyOperator,upload.single('ID'), bodyParser.urlencoded({ extended: true }),validateFieldOfficerData,async (req,res)=>{
    try{
        if(req.file){
        req.body.governmentIdImage = req.file.filename
        }
        else{
            return res.status(400).send({error: 'Upload your Government ID Image'})
        }
        const userId = parseInt(req.params.userId)
        console.log(userId)
        req.body["userId"] = userId 
        
        operatorController.registerFieldOfficer(req.body,(err,result) =>{
            if (err){
                    return res.status(400).send({error: 'Error submitting Operator Details'})
            }else{
                    return res.status(201).send(result)
            }
        })
    }catch(err){
            res.status(400).send({error:'Unexpected error while submitting operator details'})
    }
})

router.get('/:userId/recruit/field-officers',verifyOperator,async (req,res)=>{
    try{
        const userId = parseInt(req.params.userId)
        
        operatorController.getUnregisteredFieldOfficers((err,result) =>{
            if (err){
                    return res.status(400).send({error: 'Error submitting Operator Details'})
            }else{
                    return res.status(201).send(result)
            }
        })
    }catch(err){
            res.status(400).send({error:'Unexpected error while submitting operator details'})
    }
})



module.exports = router
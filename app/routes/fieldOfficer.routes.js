const express = require('express')
const authController = require('../controller/auth.controller')
const {validateRegister} = require("../middleware/validateRegister.middleware")
const router = express.Router()


router.post('/auth/register',validateRegister,(req,res)=>{
    try{
        const {email, password} = req.body
        const role = "field_officer"
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


module.exports = router
  

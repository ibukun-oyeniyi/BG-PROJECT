const express = require('express')
const productController = require('../controller/product.controller')
const {verifyOperator} = require("../middleware/auth.middleware")
const {verifiedOperator} = require("../middleware/verifiedOperator.middleware")
const router = express.Router()
const {validateOperatorData} = require("../middleware/validateOperatorData.middleware")

 
router.get('/:userId/view',verifyOperator,verifiedOperator,async (req,res)=>{
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
//create product
router.post('/:operatorId',verifyOperator,verifiedOperator,async (req,res)=>{
    try{
        const operatorId = parseInt(req.params.operatorId)
        req.body["operatorId"] = operatorId
        productController.createProduct(req.body,(err,result) =>{
            if (err){
                    return res.status(400).send({error: 'Error Creating product'})
            }else{
                    return res.status(201).send(result)
            }
        })
    }catch(err){
            res.status(400).send({error:'Unexpected error while creating product'})
    }
})



module.exports = router
const express = require('express')
const operatorController = require('../controller/operator.controller')
const {verifyOperator} = require("../middleware/auth.middleware")
const router = express.Router()
const multer = require('multer');
const upload = multer({ dest: 'uploads/',strict: false });
const bodyParser = require('body-parser');
const {validateOperatorData} = require("../middleware/validateOperatorData.middleware")

//REGISTER A USER

// router.get('/:userId/todos', verifyUser, (req, res) => {
//     try {
//       const userId = parseInt(req.params.userId)
//       const limit = parseInt(req.query.limit) || 10 // default limit is 10
  
//       todolistController.getTodoLists(userId, limit, (err, result) => {
//         if (err) {
//           return res.status(400).send({ error: 'Error getting todolists' })
//         } else {
//           return res.status(200).send(result)
//         }
//       })
//     } catch (err) {
//       res.status(400).send({ error: 'Unexpected error while getting todolists' })
//     }
//   })

// router.get('/:userId/todo/:todolistId', verifyUser, (req, res) => {
//     try {
//       const userId = parseInt(req.params.userId);
//       const todolistId = parseInt(req.params.todolistId);
      
//       todolistController.getTodoListById(userId, todolistId, (err, todolist) => {
//         if (err) {
//           return res.status(404).send({ error: 'Todolist not found' });
//         }
//         return res.status(200).send(todolist);
//       });
//     } catch (err) {
//       res.status(400).send({ error: 'Unexpected error while getting todolist' });
//     }
//   });
  
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



module.exports = router
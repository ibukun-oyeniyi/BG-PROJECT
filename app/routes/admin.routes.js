const express = require('express')
const userController = require('../controller/user.controller')
const { verifyUser, verifyAdmin } = require('../middleware/auth.middleware')
const router = express.Router()

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



module.exports = router
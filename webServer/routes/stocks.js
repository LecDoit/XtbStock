const express = require('express')

const {getAllUsers,getUser,addStock,resetUser,deleteStock,updateUserSellNBuy,getCredentials} = require('../controllers/stockController')

const router = express.Router()

const requireAuth = require('../middleware/requireAuth')

router.use(requireAuth)

// get credentials
router.get('/getCredentials',getCredentials)

// helpers
router.get('/getAllUsers',getAllUsers)

router.patch('/resetUser',resetUser)

// Endpoints used on Web
router.post('/getUser', getUser)
router.patch('/deleteStock',deleteStock)
router.patch('/updateUserSellNBuy',updateUserSellNBuy)
router.patch('/addStock',addStock)

module.exports = router


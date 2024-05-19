const express = require('express')
const router = express.Router()
const {getAllServiceCenter,getBookingAvailability,getBookingStatus,addnewBooking} = require('../controller/userController')
const userAuth = require('../middleware/userAuth')

// router.route('/').post(getAllServiceCenter)
router.get('/',getAllServiceCenter)
router.get('/availability',getBookingAvailability)
router.post('/status',getBookingStatus)
router.post('/addbooking',addnewBooking)

module.exports = router
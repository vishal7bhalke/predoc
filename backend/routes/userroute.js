import express from 'express'
import { registeruser,loginuser, getprofile,updateprofile,bookappointment, listappointment, cancelappointment, paymentrazorpay, verifyrazorpay} from '../controllers/usercontroller.js'
import authuser from '../middlewares/authuser.js'
import upload from '../middlewares/multer.js'

const userrouter=express.Router()

userrouter.post('/register',registeruser)
userrouter.post('/login',loginuser)
userrouter.get('/get-profile',authuser,getprofile)
userrouter.post('/update-profile',upload.single('image'),authuser,updateprofile)
userrouter.post('/book-appointment',authuser,bookappointment)
userrouter.get('/appointments',authuser,listappointment)
userrouter.post('/cancel-appointment',authuser,cancelappointment)
userrouter.post('/payment-razorpay',authuser,paymentrazorpay)
userrouter.post('/verifyrazorpay',authuser,verifyrazorpay)

export default userrouter
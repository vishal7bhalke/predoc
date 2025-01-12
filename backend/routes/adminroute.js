import express from 'express'
import { adddoctor ,admindashboard,alldoctors,appointmentcancel,appointmentsadmin,loginadmin} from '../controllers/admincontroller.js'
import upload from '../middlewares/multer.js'
import authadmin from '../middlewares/authadmin.js'
import { changeavailable } from '../controllers/doctorcontroller.js'

const adminrouter = express.Router()
adminrouter.post('/add-doctor',authadmin,upload.single('image'),adddoctor)
adminrouter.post('/login',loginadmin)
adminrouter.post('/all-doctors',authadmin,alldoctors)
adminrouter.post('/change-availability',authadmin,changeavailable)
adminrouter.get('/appointments',authadmin,appointmentsadmin)
adminrouter.post('/cancel-appointment',authadmin,appointmentcancel)
adminrouter.get('/dashboard',authadmin,admindashboard)

export default adminrouter
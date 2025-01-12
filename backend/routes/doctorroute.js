import express from 'express'
import { appointmentcancel, appointmentcomplete, appointmentsdoctor, doctordashboard, doctorlist, doctorprofile, logindoctor, updatedocprofile } from '../controllers/doctorcontroller.js';
import authdoctor from '../middlewares/authdoctor.js';

const doctorrouter = express.Router();

doctorrouter.get('/list',doctorlist)
doctorrouter.post('/login',logindoctor)
doctorrouter.get('/appointments',authdoctor,appointmentsdoctor)
doctorrouter.post('/complete-appointment',authdoctor,appointmentcomplete)
doctorrouter.post('/cancel-appointment',authdoctor,appointmentcancel)
doctorrouter.get('/dashboard',authdoctor,doctordashboard)
doctorrouter.get('/profile',authdoctor,doctorprofile)
doctorrouter.post('/update-profile',authdoctor,updatedocprofile)


export default doctorrouter;
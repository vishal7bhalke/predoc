import doctormodel from "../models/doctormodels.js"
import jwt from 'jsonwebtoken'
import appointmentmodel from "../models/appointmentmodel.js"
import bcrypt from 'bcryptjs'


const changeavailable = async (req, res) => {
    try {
        const { docid } = req.body
        const docdata = await doctormodel.findById(docid)
        await doctormodel.findByIdAndUpdate(docid, { available: !docdata.available })
        res.json({ success: true, message: 'availability changed' })

    }
    catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

const doctorlist = async (req, res) => {
    try {
        const doctors = await doctormodel.find({}).select(['-password', '-email'])

        res.json({ success: true, doctors })

    }
    catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}


//api for doctor login
const logindoctor = async (req, res) => {
    try {
        const { email, password } = req.body
        const doctor = await doctormodel.findOne({ email })
        if (!doctor) {
            return res.json({ success: false, message: 'invalid credentials' })
        }
        const ismatch = await bcrypt.compare(password, doctor.password)
        if (ismatch) {
            const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET)
            res.json({ success: true, token })
        }
        else {
            res.json({ success: false, message: 'invalid credentials' })
        }
    }
    catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}


//api to get doctor appointments for doc panel
const appointmentsdoctor = async (req, res) => {
    try {
        const { docid } = req.body
        const appointments = await appointmentmodel.find({ docid })

        res.json({ success: true, appointments })
    }
    catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}


//api to mark complete
const appointmentcomplete = async (req, res) => {
    try {
        const { docid, appointmentid } = req.body

        const appointmentdata = await appointmentmodel.findById(appointmentid);

        if (appointmentdata && appointmentdata.docid === docid) {

            await appointmentmodel.findByIdAndUpdate(appointmentid, { iscompleted: true })
            return res.json({ success: true, message: "appointment completed" })
        }
        else {
            return res.json({ success: false, message: "Mark failed" })
        }
    }
    catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}


//api to cancel appointment for doc model
const appointmentcancel = async (req, res) => {
    try {
        const { docid, appointmentid } = req.body
        const appointmentdata = await appointmentmodel.findById(appointmentid);
        if (appointmentdata && appointmentdata.docid === docid) {
            await appointmentmodel.findByIdAndUpdate(appointmentid, { cancelled: true })
            return res.json({ success: true, message: "appointment cancelled" })
        }
        else {
            return res.json({ success: false, message: "cancellation failed" })
        }
    }
    catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}



//api to get dashboard data 
const doctordashboard = async (req, res) => {
    try {
        const { docid } = req.body;
        const appointments = await appointmentmodel.find({ docid });
        let earnings = 0;
        appointments.map((item) => {
            if (item.iscompleted || item.payment) {
                earnings = earnings + item.amount;
            }
        })

        let patients = []
        appointments.map((item) => {
            if (!patients.includes(item.userid)) {
                patients.push(item.userid);
            }
        })
        const dashdata = {
            earnings,
            appointments: appointments.length,
            patients: patients.length,
            latestappointments: appointments.reverse().slice(0, 5)
        }
        res.json({ success: true, dashdata })

    }
    catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}


//api to get doc profile for doc panel
const doctorprofile = async (req, res) => {
    try {
        const { docid } = req.body
        const profiledata = await doctormodel.findById(docid).select('-password');
        res.json({ success: true, profiledata })
    }
    catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}


//api to updtate doctor profile data from doc panel
const updatedocprofile = async (req, res) => {
    try {
        const { docid, fees, address, available } = req.body;
        await doctormodel.findByIdAndUpdate(docid, { fees, address, available });
        res.json({ success: true, message: 'profile updated' })
    }
    catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }

}

export {
    changeavailable, doctorlist, logindoctor, appointmentsdoctor, appointmentcomplete,
    appointmentcancel, doctordashboard,
    doctorprofile, updatedocprofile
}
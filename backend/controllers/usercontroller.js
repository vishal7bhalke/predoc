import validator from 'validator'
import bcrypt from 'bcryptjs'

import usermodel from '../models/usermodel.js'
import jwt from 'jsonwebtoken'
import { v2 as cloudinary } from 'cloudinary'
import doctormodel from '../models/doctormodels.js'
import { deleteModel } from 'mongoose'
import appointmentmodel from '../models/appointmentmodel.js';

import Razorpay from 'razorpay'

//api to register user
const registeruser = async (req, res) => {
    try {

        const { email, password, name } = req.body
        if (!name || !email || !password) {
            return res.json({ success: false, message: "Missing details" })
        }
        console.log("hi register djfsdjf")
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "enter a valid email" })
        }
        if (password.length < 8) {
            return res.json({ success: false, message: "ente strong password" })
        }

        //hasing user pass
        const salt = await bcrypt.genSalt(10)
        const hashedpassword = await bcrypt.hash(password, salt)

        const userdata = {
            name,
            email,
            password: hashedpassword
        }
        const newuser = new usermodel(userdata);
        const user = await newuser.save();


        const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)

        res.json({ success: true, token })

    }
    catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}

//api for user login
const loginuser = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await usermodel.findOne({ email })
        if (!user) {
            return res.json({ success: false, message: "user does not exist" })
        }

        const ismatch = await bcrypt.compare(password, user.password)
        if (ismatch) {
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
            res.json({ success: true, token })
        } else {
            res.json({ success: false, message: 'invalid credentials' })
        }


    }
    catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}


//api to get user profil data
const getprofile = async (req, res) => {
    try {
        const { userid } = req.body;

        const userdata = await usermodel.findById(userid).select('-password')

        res.json({ success: true, userdata })

    }
    catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
}







//api to user profile
const updateprofile = async (req, res) => {
    try {
        const { userid, name, phone, address, dob, gender } = req.body
        const imagefile = req.file

        if (!name || !phone || !dob || !gender) {
            return res.json({ success: false, message: "missing credentials" })
        }
        await usermodel.findByIdAndUpdate(userid, { name, phone, address: JSON.parse(address), dob, gender })
        if (imagefile) {
            let imageUrl;
            await new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream(
                    {
                        resource_type: 'image',   // Specify it's an image
                        timeout: 120000,   // Optionally, provide a custom public_id
                    },
                    (error, result) => {
                        if (error) {
                            console.error("Cloudinary upload error:", error);
                            return reject(new Error("Image upload failed"));
                        }
                        imageUrl = result.secure_url;  // Get the secure URL of the uploaded image
                        resolve(imageUrl);  // Resolve the promise with the image URL
                    }
                ).end(imagefile.buffer);  // Pass the buffer directly to the upload stream
            }).then((url) => {
                // After upload, you can save the URL in your database
                imageUrl = url;  // Set imageUrl to the resolved value from the promise
            });

            // Save the URL in the database
            await usermodel.findByIdAndUpdate(userid, { image: imageUrl });
        }

        res.json({ sucess: true, message: "profile updated" })
    }
    catch (error) {

        console.log(error)
        res.json({ success: false, message: error.message })
    }
}



//api to book appointment
const bookappointment = async (req, res) => {
    try {
        const { userid, docid, slotdate, slottime } = req.body;
        const docdata = await doctormodel.findById(docid).select('-password')

        if (!docdata.available) {
            return res.json({ success: false, message: "doctor not available" })
        }
        let slots_booked = docdata.slots_booked
        // checking for slts avaialbility
        if (slots_booked[slotdate]) {
            if (slots_booked[slotdate].includes(slottime)) {
                return res.json({ success: false, message: "slots not available" })
            }
            else {
                slots_booked[slotdate].push(slottime)
            }
        }
        else {
            slots_booked[slotdate] = []
            slots_booked[slotdate].push(slottime)
        }

        const userdata = await usermodel.findById(userid).select('-password')
        delete docdata.slots_booked
        const appointmentdata = {
            userid,
            docid,
            userdata,
            docdata,
            amount: docdata.fees,
            slottime,
            slotdate,
            date: Date.now()
        }


        const newappointment = new appointmentmodel(appointmentdata)
        await newappointment.save();



        //save new slots data in doc data
        await doctormodel.findByIdAndUpdate(docid, { slots_booked })

        res.json({ success: true, message: 'appintment booked' })
    }
    catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }

}





//api to get user appointment
const listappointment = async (req, res) => {
    try {
        const { userid } = req.body
        const appointments = await appointmentmodel.find({ userid })

        res.json({ success: true, appointments })
    }
    catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
}




//to cancel appointment
const cancelappointment = async (req, res) => {
    try {
        const { userid, appointmentid } = req.body
        const appointmentdata = await appointmentmodel.findById(appointmentid)

        if (appointmentdata.userid !== userid) {
            return res.json({ success: false, message: "unauthorized action" });
        }

        await appointmentmodel.findByIdAndUpdate(appointmentid, { cancelled: true })

        //releasing doc slot
        const { docid, slotdate, slottime } = appointmentdata
        const doctordata = await doctormodel.findById(docid);
        let slots_booked = doctordata.slots_booked

        slots_booked[slotdate] = slots_booked[slotdate].filter(e => e !== slottime)

        await doctormodel.findByIdAndUpdate(docid, { slots_booked })

        res.json({ success: true, message: 'appoinment cancelled' })




    }
    catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
}




//to use payment first we install razorpay in backend terminal

const razorpayInstance = new Razorpay({
    key_id: process.env.RAZORPAY_KEY_ID, 
    key_secret: process.env.RAZORPAY_KEY_SECRET,  
});


//api to make payment appointment

const paymentrazorpay = async (req, res) => {
    try {
        const { appointmentid  } = req.body
        const appointmentdata = await appointmentmodel.findById(appointmentid)
       
        if (!appointmentdata || appointmentdata.cancelled) {
            return res.json({ success: false, message: "appointment cancelled or not found" }
            )
        }

        const options = {
            amount: appointmentdata.docdata.fees * 100,
            currency: process.env.CURRENCY,
            receipt: appointmentid,
        }
        
        const order = await razorpayInstance.orders.create(options)

        res.json({ success: true, order })

    }
    catch (error) {
        console.log("in rz pay")
        console.error(error);
        res.json({ success: false, message: error.message });
    }

}

//api to verify payment of razorpay
const verifyrazorpay = async (req,res) => {
    try{
        
        const {razorpay_order_id} = req.body
        console.log(razorpay_order_id)
        const orderinfo = await razorpayInstance.orders.fetch(razorpay_order_id)
        
        if(orderinfo.status === 'paid'){
           
            await appointmentmodel.findByIdAndUpdate(orderinfo.receipt, {payment: true})
            res.json({success:true,message:"payment completed"})
        }else{
            res.json({success:false,message:"payment failed"})
        }




    }
    catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
}




export { registeruser, loginuser, getprofile, updateprofile, bookappointment, listappointment, cancelappointment,paymentrazorpay,verifyrazorpay}
import validator from "validator"
import bcrypt from 'bcryptjs'
import {v2 as cloudinary} from "cloudinary"
import doctormodel from "../models/doctormodels.js"
import usermodel from "../models/usermodel.js"
import appointmentmodel from "../models/appointmentmodel.js"
import jwt from 'jsonwebtoken'
// api for adding doctor
const adddoctor = async(req,res)=> {
    try {
        const {name,email,password,speciality,degree,experience,about,fees,address} = req.body;
    
          
        const imagefile= req.file;
        
        console.log("Uploaded file info:", req.file);
        if (!req.file) {
          return res.status(400).json({ success: false, message: "No file uploaded" });
        }
        
        if (!imagefile) {
            return res.json({ success: false, message: "Please upload a profile image." });
          }
        
        // checking for all data
        if(!name || !email || !password || !speciality || !experience || !about || !fees || !degree || !address){
        
            return res.json({success:false , message:"missing details"})
        }

        //validating email format
        if(!validator.isEmail(email)) {
            return res.json({success:false, message:"please enter a valid email"})
        }

        // validating strong password
        if(password.length < 8){
            return res.json({success:false, message:"please enter a strong password"})
        }

        //hashing doctor password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)
       
        //upload image to cloudinary
        let imageUrl;
    await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream({ resource_type: "image" }, (error, result) => {
        if (error) {
          console.error("Cloudinary upload error:", error);
          return reject(new Error("Image upload failed"));
        }
        imageUrl = result.secure_url;
        resolve();
      }).end(imagefile.buffer);
    });
        
        // Now you can use imageUrl
        console.log("Uploaded image URL:", imageUrl);


        console.log(email,name,degree,speciality);
        const doctordata = {
            name,
            email,
            image: imageUrl,
            password : hashedPassword,
            speciality,
            degree,
            experience,
            about,
            fees,
            address:JSON.parse(address),
            date: Date.now()
        }
            const newdoctor=new doctormodel(doctordata);
         
          
            await newdoctor.save();
          

            res.json({success : true, message: " doctor added"})
    } catch(error) {
console.log(error);
res.json({success:false,message:error.message})
    }
}




//api for admin login
const loginadmin = async(req,res)=> {
    try{
        const {email,password}= req.body
        if(email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD){
            const token = jwt.sign(email+password, process.env.JWT_SECRET)
            res.json({success:true, token})
        }else{
            res.json({success:false,message: "invalid credentials"})
        }
    }catch(error){
        console.log(error);
        res.json({success:false , message:error.message})
    }
}

// api to get all doc lists for admin panel
const alldoctors = async (req,res)=> {
    try{
        const doctors=await doctormodel.find({}).select('-password')
        res.json({success:true,doctors})
    }
    catch(error){
        console.log(error);
        res.json({success:false,message:error.message})
    }
}



//api to get all appintments list 
const appointmentsadmin = async(req,res) =>{
    try{
        const appointments= await appointmentmodel.find({});
       
        res.json({success:true,appointments})
    }
    catch(error){
        console.log(error);
        res.json({success:false,message:error.message})
    }
}
  

//api for appointment canellation
const appointmentcancel = async (req, res) => {
    try {
        const {  appointmentid } = req.body
        const appointmentdata = await appointmentmodel.findById(appointmentid)

       

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


//api to get dashboard data
 const admindashboard = async(req,res) => {
    try{
        const doctors = await doctormodel.find({});
        const users = await usermodel.find({});
        const appointments = await appointmentmodel.find({})

        const dashdata={
            doctors : doctors.length,
            appointments : appointments.length,
            patients : users.length,
            latestappointments : appointments.reverse().slice(0,5)
        }
        res.json({success:true,dashdata})
    }
    catch (error) {
        console.error(error);
        res.json({ success: false, message: error.message });
    }
 }

export {adddoctor,loginadmin,alldoctors,appointmentsadmin,appointmentcancel,admindashboard}
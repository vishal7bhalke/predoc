import mongoose from "mongoose";
const appointmentschema = new mongoose.Schema({
    userid: {type: String, required:true},
    docid: {type: String, required:true},
    slotdate: {type: String, required:true},
    slottime: {type: String, required:true},
    userdata: {type: Object, required:true},
    docdata: {type: Object, required:true},
    date: {type: Number, required:true},
    cancelled: {type: Boolean, default:false},
    payment: {type: Boolean, default:false},
    iscompleted: {type: Boolean, default:false},
    amount: { type: Number, required: true } 

})


 const appointmentmodel =mongoose.models.appointment ||  mongoose.model('appointment',appointmentschema)
export default appointmentmodel;
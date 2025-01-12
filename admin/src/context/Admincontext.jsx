import { createContext, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export const Admincontext = createContext()

const Admincontextprovider = (props) => {

    const [atoken, setAtoken] = useState(localStorage.getItem('atoken') ? localStorage.getItem('atoken') : '');
    const backendurl = import.meta.env.VITE_BACKEND_URL
    const [doctors, setDoctors] = useState([]);
    const [appointments,setAppointments]= useState([])
    const [dashdata,setDashdata] = useState(false)
    const getalldoctors = async () => {
        try {
            const { data } = await axios.post(backendurl + '/api/admin/all-doctors', {}, { headers: { atoken } })
            if (data.success) {
                setDoctors(data.doctors)

            } else {
                toast.error(data.message)
            }

        } catch (error) {
            toast.error(error.message)
        }
    }

    const changeavailability = async (docid) => {
        try {
            const { data } = await axios.post(backendurl + '/api/admin/change-availability', { docid }, { headers: { atoken } })
            if (data.success) {
                toast.success(data.message)
                getalldoctors();
            } else {
                toast.error(data.message)
            }

        }
        catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }


    const getallappointments = async(req,res) => {
        try{
            const {data}= await axios.get(backendurl + '/api/admin/appointments',{headers : {atoken}})
            if(data.success){
                console.log("all appointments are here",data.appointments)
                setAppointments(data.appointments);
            }
            else{
                toast.error(data.message)
            }
        }
        catch(error){
            console.log(error)
            toast.error(error.message)
        }
    }


const cancelappointment = async(appointmentid) =>{
    try{
        const {data}= await axios.post(backendurl + '/api/admin/cancel-appointment',{appointmentid},{headers : {atoken}})
        if(data.success){
            toast.success(data.message)
            getallappointments()
        }
        else{
            toast.error(data.message)
        }
    }
    catch(error){
        console.log(error)
        toast.error(error.message)
    }
}


 const getdashdata = async() => {
    try{
       
        const {data} = await axios.get(backendurl + '/api/admin/dashboard', {headers : {atoken}})
        if(data.success){
            console.log(data.dashdata)
            setDashdata(data.dashdata)
        }
        else{
            toast.error(data.message)
        }
    }
    catch(error){
        console.log(error)
        toast.error(error.message)
    }

 }

    const value = {
        atoken, cancelappointment,setAtoken, changeavailability, backendurl, doctors, setDoctors,
         getalldoctors,appointments,setAppointments,getallappointments,
         dashdata,getdashdata,setDashdata
    }

    return (
        <Admincontext.Provider value={value}>
            {props.children}
        </Admincontext.Provider>
    )
}

export default Admincontextprovider 
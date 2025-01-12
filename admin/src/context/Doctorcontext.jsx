import { createContext, useState } from "react";
import {toast} from 'react-toastify'
import axios from 'axios'

export const Doctorcontext=createContext()

const Doctorcontextprovider = (props) => {
    const backendurl = import.meta.env.VITE_BACKEND_URL


    const [dtoken,setDtoken] = useState(localStorage.getItem('dtoken') ? localStorage.getItem('dtoken') : '')

    const [appointments,setAppointments]= useState([]);
    const [dashdata,setDashdata] = useState(false)
    const [profiledata,setProfiledata]= useState(false)

    const getAppointments = async ()=> {
        try{
            const {data} = await axios.get(backendurl + '/api/doctor/appointments', {headers : {dtoken}})
            if(data.success){
                setAppointments(data.appointments)
                console.log(data.appointments)
            }else{
            toast.error(data.message)
            }
        }
        catch(error){
            console.log(error)
            toast.error(error.message)
        }
    }


    const completeappointment = async (appointmentid) =>{
        try{
          
            const {data} = await axios.post(backendurl + '/api/doctor/complete-appointment',{appointmentid},{headers : {dtoken}})
            if(data.success){
                console.log("in complete")
                toast.success(data.message)
                getAppointments()
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

    const cancelappointment = async (appointmentid) =>{
        try{
            const {data} = await axios.post(backendurl + '/api/doctor/cancel-appointment',{appointmentid},{headers : {dtoken}})
            if(data.success){
                toast.success(data.message)
                getAppointments()
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

    const getdashdata = async()=>{
        try{
            const {data}= await axios.get(backendurl + '/api/doctor/dashboard',{headers : {dtoken}})
            if(data.success){
                setDashdata(data.dashdata)
                console.log(data.dashdata)
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


const getprofiledata = async()=>{
    try{
        const {data}= await axios.get(backendurl + '/api/doctor/profile',{headers : {dtoken}})
        if(data.success){
            setProfiledata(data.profiledata)
            console.log(data.profiledata)
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



    const value ={
dtoken,setDtoken,backendurl,appointments,
setAppointments,getAppointments,
completeappointment,cancelappointment,
dashdata,setDashdata,getdashdata,
profiledata,setProfiledata,getprofiledata
    }

    return (
        <Doctorcontext.Provider value={value}>
            {props.children}
        </Doctorcontext.Provider>
    )
}

export default Doctorcontextprovider
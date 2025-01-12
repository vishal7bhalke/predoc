import { createContext, useEffect, useState } from "react";
import { doctors } from "../assets/assets";
import axios from 'axios'
import { ToastContainer, toast } from "react-toastify";

export const Appcontext = createContext();
const AppcontextProvider = (props) => {
    const currencysymbol = '₹';
    const backendurl = import.meta.env.VITE_BACKEND_URL
    const [doctors, setDoctors] = useState([])
    const [userdata,setUserdata] = useState(false)

    const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : false)


    const getdoctorsdata = async () => {
        try {

            const { data } = await axios.get(backendurl + '/api/doctor/list')

            if (data.success) {
                setDoctors(data.doctors)
            }
            else {
                toast.error(data.message)
            }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }


    const loaduserprofiledata = async()=>{
        try {
const {data} =await axios.get(backendurl + '/api/user/get-profile',{headers : {token}})
       if(data.success){
        setUserdata(data.userdata)
       }   else{
        toast.error(data.message)
       }

        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }

    useEffect(() => {
        getdoctorsdata()
    }, [])

useEffect(()=>{
    if(token){
        loaduserprofiledata()
    }
    else{
        setUserdata(false)
    }
},[token])








const value = {
    doctors,getdoctorsdata ,currencysymbol, token, setToken, backendurl,userdata,setUserdata,
}
    return (
        <Appcontext.Provider value={value}>
            {props.children}
        </Appcontext.Provider>
    )

}
export default AppcontextProvider
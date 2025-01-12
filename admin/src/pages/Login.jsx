import React, { useContext, useState } from 'react'
import {assets} from '../assets/assets'
import { Admincontext } from '../context/Admincontext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { Doctorcontext } from '../context/Doctorcontext'

const Login = () => {
    const [state,setState] = useState('admin')
    const {setAtoken,backendurl} = useContext(Admincontext);
    const {setDtoken} = useContext(Doctorcontext)
    const [password,setPassword] = useState('')
    const [email,setEmail] = useState('')
const onsubmithandler= async (event)=> {
     event.preventDefault();
    try{
        if(state === 'admin'){
            console.log('admin');
            const {data} = await axios.post(backendurl + '/api/admin/login',{email,password})
            if(data.success){
                localStorage.setItem('atoken',data.token)
                setAtoken(data.token)
                console.log(data.token);
            } else{
                toast.error(data.message);
            }
        }
        else{
            console.log("in doc login")
            const {data} = await axios.post(backendurl + '/api/doctor/login',{email,password})
           console.log(data)
            if(data.success){
                localStorage.setItem('dtoken',data.token)
                setDtoken(data.token)
                console.log(data.token);
            } else{
                toast.error(data.message);
            }
        }
    } catch (error) {
        console.log(error)
        toast.error(error.message)
    }

}

  return (
    <form onSubmit={onsubmithandler} className='min-h-[80vh] flex items-center' action="">
        <div className='flex flex-col m-auto p-6 items-start gap-3 min-w-[340px] sm:min-w-96 border rounded-xl text-sm shadow-lg'>
            <p className='text-2xl font-semibold m-auto'> <span className='text-primary'> {state} </span> Login</p>
            <div className='w-full'>
                <p>Email</p>
                <input onChange={(e)=> setEmail(e.target.value)} value={email} className='border rounded w-full p-2 mt-1' type="text"  required />
            </div>
            <div className='w-full'>
                <p>Password</p>
                <input onChange={(e)=> setPassword(e.target.value)} value={password} className='border rounded  w-full p-2  mt-1 ' type="password"  required />
            </div>
            <button className='bg-primary text-white w-full py-2 rounded-md '>Login</button>
            {
                state === 'admin' ?
                <p> doctor login? <span className='text-primary underline cursor-pointer' onClick={()=> setState('doctor')}>click here</span></p>
                :    <p> admin login? <span className='text-primary underline cursor-pointer' onClick={()=> setState('admin')}>click here</span></p>
            }
        </div>
    </form>
  )
}

export default Login

import React, { useContext } from 'react'

import { Admincontext } from '../context/Admincontext'
import { assets } from '../assets/assets';
import {useNavigate} from 'react-router-dom'
import { Doctorcontext } from '../context/Doctorcontext';

const Navbar = () => {
const navigate= useNavigate();
const {atoken,setAtoken} = useContext(Admincontext);
const {dtoken,setDtoken} = useContext(Doctorcontext)
const logout = () => {
 
atoken && setAtoken('');
atoken && localStorage.removeItem('atoken')

dtoken && setDtoken('');
dtoken && localStorage.removeItem('dtoken')
navigate('/')
}


  return (
    <div className='flex justify-between items-center px-4 sm:px-10 border-b bg-white py-3'>
      <div className='flex items-center gap-2 text-xs'>
        <img className='w-36 sm:w-40 cursor-pointer' src={assets.predoc} alt="" />
        <p className='border px-2.5 py-0.5 rounded-full border-gray-500 text-gray-600 '>{atoken ? 'admin' : 'doctor'}</p>
      </div>
      <button onClick={logout} className='bg-primary text-white text-sm px-10 py-2 rounded-full'>logout</button>

    </div>
  )
}

export default Navbar

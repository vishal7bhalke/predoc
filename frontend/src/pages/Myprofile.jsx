import React, { useContext, useState } from 'react'
import { assets } from '../assets/assets';
import { Appcontext } from '../context/Appcontext';
import axios from 'axios';
import { toast } from 'react-toastify';

const Myprofile = () => {
const {userdata,setUserdata,token,backendurl} = useContext(Appcontext)
const [isedit,setIsedit]= useState(false);
const [image,setImage]=useState(false)


const updateuserprofile = async ()=> {
  try{
    const formdata = new FormData()
    formdata.append('name',userdata.name)
    formdata.append('phone',userdata.phone)
    formdata.append('address',JSON.stringify(userdata.address))
    formdata.append('gender',userdata.gender)
    formdata.append('dob',userdata.dob)
    image && formdata.append('image',image)
    
    
    const {data}= await axios.post(backendurl + '/api/user/update-profile',formdata,{headers: {token}})
 
    setIsedit(false);
    setImage(false);
      toast.success(data.message)
   
  }
  catch(error){
console.log(error)
toast.error(error.message)
  }
}


return userdata &&   (
    <div className='max-w-lg flex flex-col gap-2 text-sm'>
{
  isedit ? 
    <label htmlFor="image">
      <div className="inline-block relative cursor-pointer">
        <img className='w-36 rounded-opacity-75' 
             src={image ? URL.createObjectURL(image) : userdata.image} 
             alt="Profile" 
        />
      </div>
      <input onChange={(e)=>setImage(e.target.files[0])} id="image" type="file" hidden/>
    </label> 
  :  
    <img className='w-36 rounded' src={userdata.image} alt="Profile" />
}


     
      {
        isedit ?
        <input className='bg-gray-50 text-3xl font-medium max-w-60 mt-4' type="text" value={userdata.name} onChange={(e)=> setUserdata(prev => ({...prev,name:e.target.value}))}/>
        : <p className='font-medium text-3xl text-neutral-800 mt-4'>{userdata.name}</p>
      }
      <hr className='bg-zinc-400 h-[1px] border-none' />
      <div>
        <p className='text-neutral-500 underline mt-3'>Contact INfo</p>
        <div className='grid grid-cols-[1fr_3fr] gap-y-2 mt-3 text-neutral-600'>
          <p className='font-medium'>Email id:</p>
          <p className='text-blue-500'>{userdata.email}</p>
          <p className='font-medium'>phone:</p>
          
          {
        isedit ?
        <input className='bg-gray-100 max-w-52' type="text" value={userdata.phone} onChange={(e)=> setUserdata(prev => ({...prev,phone:e.target.value}))}/>
        : <p>{userdata.phone}</p>
      }
      <p className='font-medium' >address:</p>
      {
        isedit ?
        <p>
        <input className='bg-gray-50' type="text" value={userdata.address.line1} onChange={(e)=> setUserdata(prev => ({...prev,address: {...prev.address,line1:e.target.value}}))}/>
        <br/>
        <input className='bg-gray-50' type="text" value={userdata.address.line2} onChange={(e)=> setUserdata(prev => ({...prev,address: {...prev.address,line2:e.target.value}}))}/>
        </p> : <p className='text-gray-500'>{userdata.address.line1}</p>
        
      }
        </div>
      </div>
      <div>
        <p className='text-neutral-500 underline mt-3'>Basic Information</p>
        <div className='grid grid-cols-[1fr_3fr] gap-y-2 mt-3 text-neutral-600'>
          <p className='font-medium'>Gender</p>
          {
            isedit ?
            <select value={userdata.gender} onChange={(e)=> setUserdata(prev => ({...prev,gender: e.target.value}))}>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
            : <p className='text-gray-400'> {userdata.gender}</p>
          }
        </div>
      </div>
      <div>
        {
          isedit ?
          <button className='border border-primary px-8 rounded-full py-2 hover:bg-primary hover:text-white transition-all' onClick={()=> updateuserprofile()}> save info</button>
          : <button className='border border-primary px-8 rounded-full py-2 hover:bg-primary hover:text-white transition-all' onClick={()=> setIsedit(true)}>Edit</button>
        }
      </div>
    </div>
  )
}

export default Myprofile

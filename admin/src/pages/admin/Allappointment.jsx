import React, { useContext, useEffect } from 'react'
import { Admincontext } from '../../context/Admincontext'
import { Appcontext } from '../../context/Appcontext'
import { assets } from '../../assets/assets'

const Allappointment = () => {

  const {atoken,appointments,getallappointments,cancelappointment}= useContext(Admincontext)
const {calculateage,formatedate,currency}= useContext(Appcontext)
  useEffect(()=>{
    if(atoken){
      getallappointments()
    }
  },[atoken])


return (
    <div className='w-full max-w-7xl m-5'>
      <p className='mb-3 text-lg font-medium'>All Appointments</p>

      <div className='bg-white border-rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll'>
        <div className='hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b'>
          <p>#</p>
          <p>Patient</p>
          <p>age</p>
          <p>date and time</p>
          <p>Doctor</p>
          <p>Fees</p>
          <p>Actions</p>
        </div>
        { appointments.map((item,index)=> (
          <div className="grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50" key={index}>
            <p className='max-sm:hidden'>{index+1}</p>
            <div className='flex items-center gap-2'>
              <img className=' w-9 rounded-full' src={item.userdata.image} alt="" /> <p>{item.userdata.name}</p>
            </div>
            <p className='max-sm:hidden'>{calculateage(item.userdata.dob)}</p>
            <p>{formatedate(item.slotdate)},{item.slottime}</p>
            <div className='flex items-center gap-2'>
              <img className=' w-9 rounded-full bg-gray-200' src={item.docdata.image} alt="" /> <p>{item.docdata.name}</p>
            </div>
            <p>{currency}{item.amount}</p>
            {
              item.cancelled ? (<p className='text-red-700 text-xs font-medium'>Cancelled</p>)  : 

              item.iscompleted ? (<p className='text-green-500 text-xs font-medium'>completed</p> ) : ( <img onClick={()=> cancelappointment(item._id)} className='w-10 cursor-pointer' src={assets.cancel_icon} alt="" /> )
            }
           
            </div>
        ))}
      </div>
    </div>
  )
}

export default Allappointment

import React, { useContext, useEffect } from 'react'
import { Doctorcontext } from '../../context/Doctorcontext'
import { assets } from '../../assets/assets'
import { Appcontext } from '../../context/Appcontext'

const Doctordashboard = () => {
const {dtoken,dashdata,setDashdata,getdashdata,completeappointment,cancelappointment} = useContext(Doctorcontext)
const {currency,formatedate} = useContext(Appcontext)

useEffect(()=>{
  if(dtoken){
    getdashdata()
  }
},[dtoken])

  return dashdata && (
    <div className='m-5'>
       <div className='flex flex-wrap gap-3'>
              <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transiton-all'>
                <img className='w-14' src={assets.earning_icon} alt="" />
                <div>
                  <p className='text-xl font-semibold text-gray-700'>{currency}{dashdata.earnings}</p>
                  <p className='text-gray-400'>Earning</p>
                </div>
              </div>
      
              <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transiton-all'>
                <img className='w-14' src={assets.appointments_icon} alt="" />
                <div>
                  <p className='text-xl font-semibold text-gray-700'>{dashdata.appointments}</p>
                  <p  className='text-gray-400'>Appointment</p>
                </div>
              </div>
      
              <div className='flex items-center gap-2 bg-white p-4 min-w-52 rounded border-2 border-gray-100 cursor-pointer hover:scale-105 transiton-all'>
                <img className='w-14' src={assets.patients_icon} alt="" />
                <div>
                  <p className='text-xl font-semibold text-gray-700'>{dashdata.patients}</p>
                  <p  className='text-gray-400'>Patients</p>
                </div>
              </div>
              </div>

               <div className='bg-white'>
                    <div className='flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t border'>
                      <img src={assets.list_icon} alt="" />
                      <p className='font-semibold'>Latest slots Booking</p>
                    </div>
                    <div className='pt-4 border border-t-0'>
                  {
                    dashdata.latestappointments.map((item,index)=>(
                      <div className='flex items-center px-6 py-3 gap-3 hover:bg-gray-100' key={index}>
                        <img className='rounded-full w-10 ' src={item.userdata.image} alt="" />
                        <div className='flex-1 test-sm'>
                          <p className='text-gray-800 font-medium'>{item.userdata.name}</p>
                          <p className='text-gray-600'>{formatedate(item.slotdate)}</p>
                          </div>
                        {
                                       item.cancelled ? <p className='text-red-400 text-xs font-medium'>cancelled</p> : item.iscompleted ? <p className='text-green-500 text-xs font-medium'>completed</p>
                                         : <div className='flex '>
                                           <img onClick={() => cancelappointment(item._id)} className='w-10 cursor-pointer' src={assets.cancel_icon} alt="" />
                                           <img onClick={() => completeappointment(item._id)} className='w-10 cursor-pointer' src={assets.tick_icon} alt="" />
                                         </div>
                                     }
                       
                        </div>
                    ))
                  }
                    </div>
                  </div>
    </div>
  )
}

export default Doctordashboard

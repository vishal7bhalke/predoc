import React, { useContext, useEffect } from 'react'
import { Doctorcontext } from '../../context/Doctorcontext'
import { Appcontext } from '../../context/Appcontext'
import { assets } from '../../assets/assets'

const Doctorappointment = () => {
  const { dtoken, appointments, getAppointments, completeappointment, cancelappointment } = useContext(Doctorcontext)
  const { calculateage, formatedate, currency } = useContext(Appcontext)
  // const calculateage = (dob) => {
  //   const today= new Date();
  //   const birthdate= new Date(dob)
  //   let age= today.getFullYear() - birthdate.getFullYear()
  //   return age
  // }

  useEffect(() => {
    if (dtoken) {
      getAppointments()
    }
  }, [dtoken])

  return (
    <div className='w-full max-w-8xl m-5'>
      <p className='mb-3 text-lg font-medium'>All appointments</p>
      <div className='bg-white border-rounded text-sm max-h-[80vh] min-h-[50vh] overflow-y-scroll'>
        <div className='max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 py-3 px-6 border-b'>
          <p>#</p>
          <p>Patient</p>
          <p>Payment</p>
          <p>Age</p>
          <p>Date & time</p>
          <p>Fees</p>
          <p>Action</p>
        </div>
        {
          appointments.reverse().map((item, index) => (
            <div className='flex flex-wrap justify-between hover:bg-gray-50 max-sm:gap-5 max-sm:text-base sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_3fr_1fr_1fr] gap-1 items-center text-gray-500 py-3 border-b' key={index}>
              <p className='max:sm-hidden'>{index + 1}</p>
              <div className='fle items-center gap-2'>
                <img className='w-8 rounded-full' src={item.userdata.image} alt="" /> <p>{item.userdata.name}</p>
              </div>
              <div>
                <p className='text-xs inline border border-primary px-2 rounded-full'>
                  {item.payment ? 'Online' : 'CASH'}
                </p>
              </div>
              <p className='max:sm-hidden'>{calculateage(item.userdata.dob)}</p>
              <p>{formatedate(item.slotdate)},{item.slottime}</p>
              <p>{currency},{item.amount}</p>
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
  )
}

export default Doctorappointment

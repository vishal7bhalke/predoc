import React, { useContext, useEffect } from 'react'
import { Admincontext } from '../../context/Admincontext'

const Doctorslist = () => {
  const {doctors,atoken,getalldoctors,changeavailability} =useContext(Admincontext)

useEffect(() => {
  if(atoken){
    getalldoctors()
  }
}, [atoken])

  return (
    <div className='m-5 max-h-[90vh] overflow-y-scroll'>
     <h1 className='text-lg font-medium'>All Doctors</h1>
     <div className='w-full flex flex-wrap gap-4 pt-5 gap-y-6 '>
      {
        doctors.map((item,index)=> (
          <div className='border border-indigo-200 rounded-xl max-w-56 overflow-hidden cursor-pointer group' key={index} >
            <img className='bg-indigo-60 group-hover:bg-primary transition-all duration-500' src={item.image} alt="" />
            <div className='p-4'>
              <p className='text-neutral-800 text-lg font-medium'>{item.name}</p>
              <p  className='text-zinc-600 text-sm font-medium'>{item.speciality}</p>
              <div className='mt-2 flex items-center gap-1 text-sm'>
                <input onChange={()=> changeavailability(item._id)} type='checkbox' checked={item.available} />
                <p>available</p>
                 </div>
            </div>
            </div>
        ))
      }

     </div>
    </div>
  )
}

export default Doctorslist

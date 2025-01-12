import React, { useContext, useEffect, useState } from 'react'
import { Appcontext } from '../context/Appcontext'
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Myappointment = () => {
    const {backendurl,token,getdoctorsdata} =useContext(Appcontext);
const navigate = useNavigate();
    const [appointments,setAppointments]= useState([])
    const months = [" ","jan","feb","march","apr","may","jun","jul","aug","sep","oct","nov","dec"]

    const formatedate = (slotdate)=> {
      const datearray= slotdate.split('_');
      return datearray[0] + " " + months[Number(datearray[1])] + " " + datearray[2]
    }

    const getuserappointment = async ()=>{
      try{
       
        const {data} = await axios.get(backendurl+ '/api/user/appointments',{headers: {token}})
        if(data.success){
          console.log("hiiii")
          setAppointments(data.appointments.reverse());
          console.log(data.appointments)
        }
      }
      catch(error){
        console.log(error)
        toast.error(error.message)
      }
    }




const cancelappointment = async(appointmentid) => {
  try{
    const {data} =await axios.post(backendurl+ '/api/user/cancel-appointment',{appointmentid},{headers : {token}})
    if(data.success){
      toast.success(data.message);
      getuserappointment()
      getdoctorsdata()
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



const initpay = (order) =>{
  const options = {
    key: import.meta.env.VITE_RAZORPAY_KEY_ID,
    amount : order.amount,
    currency : order.currency,
    name: 'Appointment payment',
    description: 'Appointment payment',
    order_id : order.id,
    receipt :order.receipt,
    handler : async(response)=>{
      
      try{
        const { razorpay_order_id, ...rest } = response;
        console.log(response)
        const {data} = await axios.post(backendurl + '/api/user/verifyrazorpay' ,{ razorpay_order_id, ...rest },{headers : {token}})
        if(data.success){
          getuserappointment()
          navigate('/myappoint')
        }
      }
      catch(error){
        console.log(error)
        toast.error(error.message)
      }
    }
  }


  const rzp= new window.Razorpay(options);
  rzp.open()
}




const appointmentrazorpay = async (appointmentid)=>{
 
try{
  console.log(appointmentid)
  const {data}= await axios.post(backendurl + '/api/user/payment-razorpay',{appointmentid},{headers:{token}})

  if(data.success){
    console.log(data.order);
    initpay(data.order)
  }else{
    toast.error(data.message)
  }
}
catch(error){
  console.log(error)
  toast.error(error.message)
}
}





useEffect(()=>{
  if(token){
    getuserappointment()
  }
},[])

  return (
    <div>
     <p className='pb-3 mt-12 font-medium text-zinc-700 border-b'>My appointments</p>
     <div>
        {
            appointments.slice(0,4).map((item,index)=> (
               <div className='grid grid-cols-[1fr_2fr] gap-4 sm:flex sm:gap-6 py-2 border-b' key={index}>
                    <div>
                        <img className='w-32 bg-indigo-50' src={item.docdata.image} alt="" />
                    </div>
                    <div className='flex-1 text-sm text-zinc-600'>
                        <p className='text-neutral-700 font-semibold'>{item.docdata.name}</p>
                        <p>{item.docdata.speciality}</p>
                        <p className='text-zinc-700 font-medium mt-1'>Address:</p>
                        <p className='text-xs'>{item.docdata.address.line1}</p>
                        <p className='text-xs mt-1'><span className='text-sm text-neutral-700 font-medium'>date & time</span> {formatedate(item.slotdate)} | {item.slottime}</p>
                        </div>
                        <div></div>
                      <div className='flex flex-col gap-2 justify-end'>
                      {!item.cancelled && item.payment && !item.iscompleted && <button className='sm:min-w-48 py-2  border rounded text-stone-700 bg-green-100'>Paid</button>}
                      {!item.cancelled && !item.payment &&  !item.iscompleted &&<button onClick={()=> appointmentrazorpay(item._id)} className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border hover:bg-primary hover:text-white transition-all duration-400'>Pay Online</button>}  
                      {!item.cancelled && !item.iscompleted && <button onClick={()=> cancelappointment(item._id)} className='text-sm text-stone-500 text-center sm:min-w-48 py-2 border hover:bg-red-600 hover:text-white transition-all duration-300'>Cancel appointement</button>} 
                      {item.cancelled && !item.iscompleted &&<button className='sm:min-w-48 py-2 border border-red-600 rounded text-red-500'>appointement cancelled</button>}
                      {item.iscompleted && <button className='sm:min-w-48 py-2 border border-green-500 rounded text-green-500'>completed</button>}
                    </div>
               </div>
            ))
        }
     </div>
    </div>
  )
}

export default Myappointment

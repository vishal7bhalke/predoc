import React, { useContext, useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { Appcontext } from '../context/Appcontext';

const Doctor = () => {
  const navigate=useNavigate();
const [filterdoc,setFilterdoc]=useState([]);
const [showfilter,setShowfilter]=useState(false);
const {speciality} =useParams();
const {doctors}= useContext(Appcontext);

const applyfilter = ()=>{
  if(speciality){
    setFilterdoc(doctors.filter(doc => doc.speciality===speciality))
  }
  else{
    setFilterdoc(doctors)
  }
}

console.log(speciality);

useEffect(()=>{
applyfilter();
},[speciality,doctors])

  return (
    <div>
       <p className='text-gray-600'>Browse through the doctors specialist.</p>
       <div  className='flex flex-col sm:flex-row items-start gap-5 mt-5'>
       <button className={`py-1 px-3 border rounded text-sm transition-all sm:hidden  ${showfilter ? 'bg-primary text-white' : ''}`} onClick={()=> setShowfilter(prev => !prev)}>Filters</button>
       <div className={`flex flex-col gap-4 text-sm text-gray-600 ${showfilter ? 'flex' : 'hidden sm:flex'}`}>
        <p onClick={()=> speciality === 'General physician' ? navigate('/doctors'): navigate('/doctors/General physician')} className={`w-[94vw] sm:w-auto p1-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "General physician" ? "bg-indigo-100 text-black" : ""}`}>General physician</p>
        <p onClick={()=> speciality === 'Gynecologist' ? navigate('/doctors'): navigate('/doctors/Gynecologist')} className={`w-[94vw] sm:w-auto p1-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Gynecologist" ? "bg-indigo-100 text-black" : ""}`}>Gynecologist</p>
        <p onClick={()=> speciality === 'Dermatologist' ? navigate('/doctors'): navigate('/doctors/Dermatologist')} className={`w-[94vw] sm:w-auto p1-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Dermatologist" ? "bg-indigo-100 text-black" : ""}`}>Dermatologist</p>
        <p onClick={()=> speciality === 'Pediatricians' ? navigate('/doctors'): navigate('/doctors/Pediatricians')} className={`w-[94vw] sm:w-auto p1-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Pediatricians" ? "bg-indigo-100 text-black" : ""}`}>Pediatricians</p>
        <p onClick={()=> speciality === 'Neurologist' ? navigate('/doctors'): navigate('/doctors/Neurologist')} className={`w-[94vw] sm:w-auto p1-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Neurologist" ? "bg-indigo-100 text-black" : ""}`}>Neurologist</p>
        <p onClick={()=> speciality === 'Gastroenterologist' ? navigate('/doctors'): navigate('/doctors/Gastroenterologist')} className={`w-[94vw] sm:w-auto p1-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${speciality === "Gastroenterologist" ? "bg-indigo-100 text-black" : ""}`}>Gastroenterologist</p>
       </div>
       <div className='w-full grid grid-cols-auto gap-4 gap-y-6'>
        {
          filterdoc.map((items,index)=> (
                
            <div key={index} onClick={()=> navigate(`/appointment/${items._id}`)} className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer transform hover:translate-y-[-10px] transition-all duration-500'>
             <img className='bg-blue-50' src={items.image} alt="" />
             <div className='p-4'>
             <div className='flex items-center gap-2 text-sm text-center text-green-500'>
                        <p className={`w-2 h-2 ${items.available ?' bg-green-500': 'bg-red-400'} rounded-full`}> </p> <br /> {items.available ? <p>Available</p> : <p className='text-gray-400'>not available</p>}
                    </div>
                 <p className='text-gray-900 text-lg font-medium'>{items.name}</p>
                 <p className='text-gray-600 text-sm:'>{items.speciality}</p>
             </div>
             </div> 
         ))
        }
       </div>
       </div>
    </div>
  )
}

export default Doctor;

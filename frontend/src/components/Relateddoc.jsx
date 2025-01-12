import React, { useEffect, useState } from 'react'
import { useContext } from 'react'
import { Appcontext } from '../context/Appcontext'
import { useNavigate } from 'react-router-dom';

const Relateddoc = ({speciality,docid}) => {

const {doctors} = useContext(Appcontext);
const [reldocs,setReldocs] = useState([]);
const navigate = useNavigate();

useEffect(()=>{
if(doctors.length >0 && speciality){
    const doctorsdata=doctors.filter((doc)=> doc.speciality===speciality && doc._id!==docid);
    setReldocs(doctorsdata);
}
},[doctors,speciality,docid])
  return (
    <div className='flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10'>
   
    <h1 className='text-3xl font-medium'>Related doctors</h1>
    <p className='sm:w-1/3 text-center text-sm'>simply browse through our extensive list of trusted doctors.</p>
    <div className='w-full grid grid-cols-auto gap-4 pt-5 gap-y-6 px-3 sm:px-0'>
      {
          reldocs.slice(0,5).map((items,index)=> (
              
             <div key={index} onClick={()=> {navigate(`/appointment/${items._id}`); scrollTo(0,0)}} className='border border-blue-200 rounded-xl overflow-hidden cursor-pointer transform hover:translate-y-[-10px] transition-all duration-500'>
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
    <button onClick={()=>{ navigate(`/doctors`); scrollTo(0,0)}} className='bg-blue-50 text-gray-600 px-12 py-3 rounded-full mt-10'>more</button>
  </div>
  )
}

export default Relateddoc

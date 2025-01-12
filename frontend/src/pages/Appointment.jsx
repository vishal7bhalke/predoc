import React, { useContext, useEffect, useState } from 'react'
import { data, useNavigate, useParams } from 'react-router-dom'
import { Appcontext } from '../context/Appcontext';
import { assets } from '../assets/assets';
import Relateddoc from '../components/Relateddoc';
import { toast } from 'react-toastify';
import axios from 'axios';

const Appointment = () => {

  const { docid } = useParams();
  const { doctors, currencysymbol, backendurl, token, getdoctorsdata } = useContext(Appcontext);
  const daysofweek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const navigate = useNavigate();

  const [docinfo, setDocinfo] = useState(null);
  const [docslots, setDocslots] = useState([]);
  const [slotindex, setSlotindex] = useState(0);
  const [slottime, setSlottime] = useState('');

  const fetchdocinfo = () => {
    const docinfo = doctors.find(doc => doc._id === docid);
    if (docinfo) {
      setDocinfo(docinfo);
    } else {
      console.error("Doctor not found");
    }

  }

  const getavailability = async () => {
    setDocslots([]);
    //getting current date
    let today = new Date();
    for (let i = 0; i < 7; i++) {
      //getting data with index
      let currentdate = new Date(today);
      currentdate.setDate(today.getDate() + i);
      // seting end time of the date with index
      let endtime = new Date();
      endtime.setDate(today.getDate() + i);
      endtime.setHours(21, 0, 0, 0);

      //setting hours
      if (today.getDate() === currentdate.getDate()) {
        currentdate.setHours(currentdate.getHours() > 10 ? currentdate.getHours() + 1 : 10);
        currentdate.setMinutes(currentdate.getMinutes() > 30 ? 30 : 0);
      }
      else {
        currentdate.setHours(10);
        currentdate.setMinutes(0);
      }

      let timeslots = [];
      while (currentdate < endtime) {
        let formattedtime = currentdate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

        let day = currentdate.getDate()
        let month = currentdate.getMonth() + 1
        let year = currentdate.getFullYear()
  
        const slotdate = day + "_" + month + "_" + year
        const slottime=formattedtime
        const isslotavailable = docinfo.slots_booked[slotdate] && docinfo.slots_booked[slotdate].includes(slottime) ? false : true

        if(isslotavailable){
    //add slot to array
    timeslots.push({
      datetime: new Date(currentdate),
      time: formattedtime,
    })

        }

    
        //increment currnt time by 30 min
        currentdate.setMinutes(currentdate.getMinutes() + 40);
      }

      setDocslots(prev => ([...prev, timeslots]));
    }


  };




  const bookappointment = async () => {
    console.log("in appoint")
    if (!token) {
      toast.warn('login to book appointment')
      return navigate('/login')
    }
    try {
      const date = docslots[slotindex][0].datetime;
      let day = date.getDate()
      let month = date.getMonth() + 1
      let year = date.getFullYear()

      const slotdate = day + "_" + month + "_" + year
      const { data } = await axios.post(backendurl + '/api/user/book-appointment', { docid, slotdate, slottime }, { headers: { token } })
      
      if (data.success) {
        const msg=data.message;
        toast.success(msg);
      
        getdoctorsdata();
        navigate('/myappoint');
     } else {
      const msg=data.message;
        toast.error(msg);
     }
     

    }
    catch (error) {
      console.log(error)
      toast.error(error.messsage)
    }
  }





  useEffect(() => {
    fetchdocinfo();
  }, [doctors, docid])

  useEffect(() => {
    getavailability();
  }, [docinfo])

  useEffect(() => {
    console.log('updated socslots', docslots);
  }, [docslots])


  return docinfo && (
    <div>
      {/* doctor details */}
      <div className='flex flex-col sm:flex-row gap-4'>
        <div>
          <img className='bg-primary w-full sm:max-w-72 rounded-lg' src={docinfo.image} alt="" />
        </div>

        <div className='flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>

          {/* doc info */}
          <p className='flex items-center gap-2 text-2xl font-medium text-gray-900'>
            {docinfo.name}
            <img className='w-5' src={assets.verified_icon} alt="" />
          </p>
          <div className='flex items-center gap-2 text-sm mt-1 text-gray-600'>
            <p>{docinfo.degree} - {docinfo.speciality}</p>
            <button className='py-0.5 px-2 border text-xs rounded-full'>{docinfo.experience}</button>
          </div>

          {/* doctor about */}
          <div>
            <p className='flex items-center gap-1 text-sm font-medium text-gray-900 mt-3'>About <img src={assets.info_icon} alt="" /></p>
            <p className='text-md text-gray-500 max-w-[700px] mt-1'>{docinfo.about}</p>
          </div>
          <p className='text-gray-500 font-medium mt-4'>
            Appointment fee : <span>{currencysymbol} {docinfo.fees}</span>
          </p>
        </div>
      </div>




      {/* bookin slots */}
      <div className='sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700'>
        <p>Booking Slots  </p>
        <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4'>
          {
            docslots.length && docslots.map((item, index) => (
              <div onClick={() => setSlotindex(index)} key={index} className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotindex === index ? 'bg-primary text-white' : 'border border-gray-600'}`}>
                <p>{item[0] && daysofweek[item[0].datetime.getDay()]}</p>
                <p>{item[0] && item[0].datetime.getDate()}</p>
              </div>
            ))
          }
        </div>

        <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4'>
          {docslots.length && docslots[slotindex].map((item, index) => (
            <p onClick={() => setSlottime(item.time)} className={`text-sm font-light flex-shrink-0 px-5 py-3 rounded-full cursor-pointer ${item.time === slottime ? 'bg-primary text-white' : 'border border-gray-400'}`} key={index}>
              {item.time.toLowerCase()}
            </p>
          ))}
        </div>

        <button onClick={bookappointment} className='bg-primary text-white text-sm font-light px-14 py-3 rounded-full my-6'>Book an Appointment</button>
      </div>
      {/* related doctors */}
      <Relateddoc docid={docid} speciality={docinfo.speciality} />
    </div>
  )
}

export default Appointment

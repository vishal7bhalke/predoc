import React, { useContext } from 'react'
import Login from './pages/Login'
import { ToastContainer, toast } from 'react-toastify';
import { Admincontext } from './context/Admincontext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/admin/Dashboard';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import Adddoctor from './pages/admin/Adddoctor';
import Doctorlist from './pages/admin/Doctorslist'
import Allappointment from './pages/admin/Allappointment'
import { Doctorcontext } from './context/Doctorcontext';
import Doctordashboard from './pages/doctor/Doctordashboard';
import Doctorappointment from './pages/doctor/Doctorappointment';
import Doctorprofile from './pages/doctor/Doctorprofile';

const App = () => {
  const {atoken} = useContext(Admincontext);
  const {dtoken} = useContext(Doctorcontext);
  return atoken || dtoken ? (
    <div className='bg-[#F8F9FD]'>
     <ToastContainer/>
     <Navbar/>
     <div className='flex'>
      <Sidebar/>
      <Routes>
        {/* admin route */}
        <Route path='/' element={<></>}></Route>
        <Route path='/admin-dashboard' element={<Dashboard/>}></Route>
        <Route path='/all-appointments' element={<Allappointment/>}></Route>
        <Route path='/add-doctor' element={<Adddoctor/>}></Route>
        <Route path='/doctor-list' element={<Doctorlist/>}></Route>

        {/* doctor route */}
        <Route path='/doctor-dashboard' element={<Doctordashboard/>}></Route>
        <Route path='/doctor-appointments' element={<Doctorappointment/>}></Route>
        <Route path='/doctor-profile' element={<Doctorprofile/>}></Route>
      </Routes>
     </div>
    </div>
  ) : (
    <>
     <Login/>
     <ToastContainer/>
    </>
  )
}

export default App

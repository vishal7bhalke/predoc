
import { Route, Routes } from "react-router-dom";
import Home from './pages/Home'
import Login from "./pages/Login";
import About from "./pages/About";
import Contact from "./pages/contact";
import Doctor from "./pages/doctor";
import Myprofile from "./pages/Myprofile";
import Appointment from "./pages/Appointment";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Myappointment from "./pages/Myappointment";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function App() {
 

  return (
    <>
     <div className="m-5">  
      <ToastContainer/>
     <Navbar />
     <Routes>
      <Route path="/" element={<Home/>} > </Route>
      <Route path="/Login" element={<Login/>} > </Route>
      <Route path="/About" element={<About/>} > </Route>
      <Route path="/Contact" element={<Contact/>} > </Route>
      <Route path="/doctors" element={<Doctor/>} > </Route>
      <Route path="/doctors/:speciality" element={<Doctor/>} > </Route>
      <Route path="/myprofile" element={<Myprofile/>} > </Route>
      <Route path="/myappoint" element={<Myappointment/>} ></Route>
      <Route path="/appointment/:docid" element={<Appointment/>} > </Route>
     </Routes>
     <Footer/>
     </div>
    
    </>
  )
}

export default App

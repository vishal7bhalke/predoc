import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import Admincontextprovider, { Admincontext } from './context/Admincontext.jsx'
import Doctorcontextprovider from './context/Doctorcontext.jsx'
import Appcontextprovider from './context/Appcontext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
  <Admincontextprovider>
    <Doctorcontextprovider>
      <Appcontextprovider>
      <App />
      </Appcontextprovider>
    </Doctorcontextprovider>
  </Admincontextprovider>
   
  </BrowserRouter>,
)

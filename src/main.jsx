import React from 'react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
// import './index.css'
import App from './App.jsx'
import Register_Page from './register.jsx'
import Welcome_Page from './welcome.jsx'
import Calendar from './components/Calendar.jsx'
import Home_Page from './Home.jsx'
import Reserve_Page from './reserve.jsx'
import List_Page from './list.jsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';



createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App/>
  </StrictMode>
);




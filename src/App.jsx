import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import React from 'react';
// import './App.css'
import Calendar from './components/calendar'
import Register_Page from './register';
import Welcome_Page from './welcome';
import Reserve_Page from './reserve';
import List_Page from './list';
import Home_Page from './Home';
import Navbar from "./components/navbar";



function App() {

  return (
    // <>
    //   <Navbar />
    //   <Reserve_Page />
    // </>
    <Router>
       <>
         <Navbar />
       </>
        <Routes>
        <Route path="/" element={<Home_Page />} />
        <Route path="/List" element={<List_Page />} />
        <Route path="/Reserve" element={<Reserve_Page />} />
        {/* <Route path="/Calendar" element={<Calendar_Page />} /> */}
        {/* <Route path="/welcome" element={<Welcome_Page />} /> */}
      </Routes>
    </Router>
  );


}

export default App

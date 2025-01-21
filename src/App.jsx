import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import React from 'react';
// import './App.css'
import Calendar from './components/Calendar'
import Register_Page from './register';
import Welcome_Page from './welcome';
import Reserve_Page from './reserve';
import List_Page from './list';
import Home_Page from './Home';



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
        <Route path="/" element={<Reserve_Page />} />
        <Route path="/List" element={<List_Page />} />
        <Route path="/Home" element={<Home_Page />} />
        {/* <Route path="/Calendar" element={<Calendar_Page />} /> */}
        {/* <Route path="/welcome" element={<Welcome_Page />} /> */}
      </Routes>
    </Router>
  );


}

export default App

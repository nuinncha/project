import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import React from 'react';
// import './App.css'
import Calendar from './components/calendar'
import Register_Page from './register';
import Welcome_Page from './welcome';
import Reserve_Page from './reserve';
import List_Page from './list';
import Home_Page from './Home';




function App() {

  return (

    <Router>

        <Routes>
        <Route path="/" element={<Home_Page />} />
        <Route path="/register" element={<Register_Page />} />
        <Route path="/list" element={<List_Page />} />
        <Route path="/reserve" element={<Reserve_Page />} />
        {/* <Route path="/Calendar" element={<Calendar_Page />} /> */}
        {/* <Route path="/welcome" element={<Welcome_Page />} /> */}
      </Routes>
    </Router>
  );


}

export default App

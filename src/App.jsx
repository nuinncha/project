import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import React from 'react';
// import './App.css'
import Calendar from './components/calendar'
import Register_Page from './register';
import Welcome_Page from './welcome';
import Reserve_Page from './reserve';
import List_Page from './list';
import Home_Page from './Home.jsx';
import Check_Page from './check.jsx';
import Admin_Page from './admin.jsx';
import History_Page from './history.jsx';
import Profile_Page from './profile.jsx';




function App() {

  return (

    <Router>
        <Routes>
        <Route path="/" element={<Home_Page />} />
        <Route path="/register" element={<Register_Page />} />
        <Route path="/welcome" element={<Welcome_Page />} />
        <Route path="/list" element={<List_Page />} />
        <Route path="/reserve" element={<Reserve_Page />} />
        <Route path="/check" element={<Check_Page />} />
        <Route path="/admin" element={<Admin_Page />} />
        <Route path="/history" element={<History_Page />} />
        <Route path="/profile" element={<Profile_Page />} />

      </Routes>
    </Router>
  );


}

export default App

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import React from 'react';
// import './App.css'
import Calendar from './components/calendar'
import Register_Page from './register';
import Welcome_Page from './welcome';
import Reserve_Page from './reserve';
import List_Page from './list';
import Home_Page from './home.jsx';
import Check_Page from './check.jsx';
import Edit_Page from './edit.jsx';
import History_Page from './history.jsx';
import Profile_Page from './profile.jsx';
import Dashboard from './dashboard.jsx';
import Listname_Page from './listname.jsx';




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
        <Route path="/edit" element={<Edit_Page />} />
        <Route path="/history" element={<History_Page />} />
        <Route path="/profile" element={<Profile_Page />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/listname" element={<Listname_Page/>} />

      </Routes>
    </Router>
  );


}

export default App

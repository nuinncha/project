import React from "react";
import Calendar from "./components/calendar";
import "./components/calendar.css";
import './home.css'
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet"></link>



function Home_Page() {
  return (
    <>
      {/* Dashboard */}
      <div className="dashboard">
        <div className="dashboard-item green">
          <i className="icon">&#128197;</i>
          <p className="font">จองห้องประชุม</p>
          <span>0 วัน</span>
        </div>
        <div className="dashboard-item yellow">
          <i className="icon">&#128197;</i>
          <p>ห้องประชุม</p>
          <span>2 ห้องประชุมหมด</span>
        </div>
      </div>

      {/* ปฏิทิน */}
      <Calendar />

      {/* ปุ่มห้องประชุม */}
      <div>
        <button className="btn-purple">ห้องประชุม 1</button>
        <button className="btn-blue">ห้องประชุม 2</button>
      </div>
    </>
  );
}

export default Home_Page;

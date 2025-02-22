import React from "react";
import Calendar from "./components/calendar";
import "./components/calendar.css";
import './home.css'
import Navbar from "./components/navbar";
<link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet"></link>
import { FaCalendarAlt } from "react-icons/fa";
import { LuCalendarDays } from "react-icons/lu";
import { LuClipboardList } from "react-icons/lu";
import { RiDashboardFill } from "react-icons/ri";
import { useNavigate } from 'react-router-dom';

function Home_Page() {
  const navigate = useNavigate();

  // useEffect(() => {
  //   const token = localStorage.getItem('token');
    
  //   if (!token) {
  //     alert("Please log in first.");
  //     navigate('/');
  //   }
  // }, [navigate]);

  return (
    <>
      <Navbar />
      {/* Dashboard */}
      <div style={{ marginTop: "10px" }}>&nbsp;&nbsp;
        <RiDashboardFill className="icon-size" /> &nbsp;&nbsp;
        <span className="text-position">Dashboard</span>
      </div>
      <div className="wrapper-home">
        <div className="container">
          <div class="box-green box1">
            <LuCalendarDays className="icon-inside-box" />
          </div>
          <div class="box-brightgreen box2">
            <div className="text-dashboard-right">
              <p className="">จองห้องประชุม</p>
              <p>0</p>
              <p>วัน</p>
            </div>
          </div> &nbsp; &nbsp; &nbsp;

          <div class="box-yellow box3">
            <LuClipboardList className="icon-inside-box" />
          </div>
          <div class="box-brighyellow box4">
            <div className="text-dashboard-right">
              <p>ห้องประชุม</p>
              <p>2</p>
              <p>ห้องประชุมทั้งหมด</p>
            </div>
          </div>
        </div>
      </div>
      <div style={{ marginTop: "15px" }}> &nbsp;&nbsp;&nbsp;
        <FaCalendarAlt className="icon-size" /> &nbsp;&nbsp;
        <span className="text-position">ปฏิทินการจอง</span>
      </div>

      {/* ปฏิทิน */}
      <Calendar />

      {/* ปุ่มห้องประชุม */}
      <div>
        <button className="btn-purple">ห้องประชุม 1</button>
        <button className="btn-blue">อาคารเฉลิมพระเกียรติ</button>
      </div>
    </>
  );
}

export default Home_Page;

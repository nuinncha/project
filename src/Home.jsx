import React from "react";
import Calendar from "./components/calendar";
import Calendar2 from "./components/calendar2";
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
  return (
    <>
      <Navbar />
      <div className="bg-home">
        {/* Dashboard */}
        <div style={{ marginTop: "10px" }}>&nbsp;&nbsp;
          <RiDashboardFill className="icon-size" /> &nbsp;&nbsp;
          <span className="text-position">Dashboard</span>
        </div>
        <div className="wrapper-home">
          <div className="container">
            <div className="box-green box1">
              <LuCalendarDays className="icon-inside-box" />
            </div>
            <div className="box-brightgreen box2">
              <div className="text-dashboard-right">
                <p className="">จองห้องประชุม</p>
                <p>0</p>
                <p>วัน</p>
              </div>
            </div> &nbsp; &nbsp; &nbsp;

            <div className="box-yellow box3">
              <LuClipboardList className="icon-inside-box" />
            </div>
            <div className="box-brighyellow box4">
              <div className="text-dashboard-right">
                <p>ห้องประชุม</p>
                <p>2</p>
                <p>ห้องประชุมทั้งหมด</p>
              </div>
            </div>
          </div>
        </div>
        <div> &nbsp;&nbsp;&nbsp;
          <FaCalendarAlt className="icon-size" /> &nbsp;&nbsp;
          <span className="text-position">ปฏิทินการจอง</span>
        </div>
        {/* ปฏิทิน */}
        <Calendar2 />
        {/* ปุ่มห้องประชุม */}
        <div>
          <button className="btn-purple">ห้องประชุม 1</button>
          <button className="btn-blue">อาคารเฉลิมพระเกียรติ</button>
        </div>
      </div>
    </>
  );
}

export default Home_Page;

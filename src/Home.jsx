import React from "react";
import { useNavigate } from "react-router-dom";
import { FaCalendarAlt } from "react-icons/fa";
import { LuCalendarDays, LuClipboardList } from "react-icons/lu";
import { RiDashboardFill } from "react-icons/ri";
import Navbar from "./components/navbar";
import Calendar2 from "./components/calendar2";
import "./components/calendar.css";
import "./home.css";

function Home_Page() {
  const navigate = useNavigate();

  return (
    <>
      <Navbar />

      <div className="main-card-wrapper">
        {/* Header */}
        <div className="section-header">
          <RiDashboardFill className="icon" />
          <span className="section-title">Dashboard</span>
        </div>

        {/* การ์ดย่อยแนวนอน */}
        <div className="horizontal-card-container">
          {/* การ์ดจองห้อง */}
          <div className="dashboard-box green">
            <LuCalendarDays className="icon" />
            <div className="info">
              <p>จองห้องประชุม</p>
              <p className="number">0</p>
              <p>วัน</p>
            </div>
          </div>

          {/* การ์ดห้องทั้งหมด */}
          <div className="dashboard-box yellow">
            <LuClipboardList className="icon" />
            <div className="info">
              <p>ห้องประชุม</p>
              <p className="number">2</p>
              <p>ห้องประชุมทั้งหมด</p>
            </div>
          </div>
        </div>

        {/* ปฏิทินการจอง */}
        <div className="section-header" style={{ marginTop: '30px' }}>
          <FaCalendarAlt className="icon" />
          <span className="section-title">ปฏิทินการจอง</span>
        </div>

        {/* ปฏิทิน */}
        <Calendar2 />

        {/* ปุ่มห้อง */}
        <div className="room-buttons">
          <button className="btn-purple">ห้องประชุม 1</button>
          <button className="btn-blue">อาคารเฉลิมพระเกียรติ</button>
        </div>
      </div>
    </>
  );
}

export default Home_Page;

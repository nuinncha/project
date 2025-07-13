import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { FaCalendarAlt } from "react-icons/fa";
import { LuCalendarDays, LuClipboardList } from "react-icons/lu";
import { RiDashboardFill } from "react-icons/ri";
import moment from "moment";
import 'moment/locale/th';

import Navbar from "./components/navbar";
import Calendar2 from "./components/calendar2";
import "./components/calendar.css";
import "./home.css";


moment.locale("th");

function Home_Page() {
  const navigate = useNavigate();
  const [approvedDaysToday, setApprovedDaysToday] = useState(0);

  useEffect(() => {
    fetch("http://localhost:3000/booking-info")
      .then((res) => res.json())
      .then((data) => {
        const today = moment().format("DD-MM-YYYY");
        const todayBookings = data.filter((booking) =>
          booking.status === "อนุมัติ" &&
          moment(booking.startDate).format("DD-MM-YYYY") === today
        );
        setApprovedDaysToday(todayBookings.length);
      })
      .catch((error) => {
        console.error("Error fetching booking data:", error);
      });
  }, []);

  return (
    <>
      <Navbar />
      <div className="bg-home">
        {/* Section Header */}
        <div style={{ marginTop: "10px" }}>
          &nbsp;&nbsp;
          <RiDashboardFill className="icon-size" /> &nbsp;&nbsp;
          <span className="text-position">Dashboard</span>
        </div>

        {/* Dashboard Boxes */}
        <div className="wrapper-home">
          <div className="container-home">
            {/* Group 1 */}
            <div className="box-group">
              <div className="box-green">
                <LuCalendarDays className="icon-inside-box" />
              </div>
              <div className="box-brightgreen">
                <div className="text-dashboard-right">
                  <p>จองห้องประชุมวันนี้</p>
                  <p className="text-number">{approvedDaysToday}</p>
                  <p>ครั้ง</p>
                </div>
              </div>
            </div>

            {/* Group 2 */}
            <div className="box-group">
              <div className="box-yellow">
                <LuClipboardList className="icon-inside-box" />
              </div>
              <div className="brightyellow">
                <div className="text-dashboard-right">
                  <p>ห้องประชุม</p>
                  <p className="text-number">2</p>
                  <p>ห้องประชุมทั้งหมด</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Calendar Header */}
        <div className="section-header" style={{ marginTop: '30px' }}>
          <FaCalendarAlt className="icon" />
          <span className="section-title">ปฏิทินการจอง</span>
        </div>

        {/* Calendar */}
        <Calendar2 />

        {/* Room Buttons */}
        <div className="room-buttons">
          <button className="btn-purple">ห้องประชุม 1</button>
          <button className="btn-blue">อาคารเฉลิมพระเกียรติ</button>
        </div>
      </div>
    </>
  );
}

export default Home_Page;

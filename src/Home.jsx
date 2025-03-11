import React, { useState, useEffect } from "react";
import Calendar2 from "./components/calendar2";
import "./home.css";
import Navbar from "./components/navbar";
import { FaCalendarAlt } from "react-icons/fa";
import { LuCalendarDays, LuClipboardList } from "react-icons/lu";
import { RiDashboardFill } from "react-icons/ri";
import moment from "moment";
import 'moment/locale/th';


moment.locale("th"); // ตั้งค่าภาษาไทย

function Home_Page() {
  const [approvedDaysToday, setApprovedDaysToday] = useState(0);

  useEffect(() => {
    fetch("http://localhost:3000/booking-info")
      .then((res) => res.json())
      .then((data) => {
        const today = moment().format("DD-MM-YYYY"); // หาวันที่ปัจจุบัน

        // กรองเฉพาะการจองที่มีสถานะ "อนุมัติ" และเป็นวันนี้
        const todayBookings = data.filter((booking) => 
          booking.status === "อนุมัติ" &&
          moment(booking.startDate).format("DD-MM-YYYY") === today
        );

        setApprovedDaysToday(todayBookings.length); // นับจำนวนการจองวันนี้
      })
      .catch((error) => {
        console.error("Error fetching booking data:", error);
      });
  }, []);

  return (
    <>
      <Navbar />
      <div className="bg-home">
        {/* Dashboard */}
        <div style={{ marginTop: "10px" }}>
          &nbsp;&nbsp;
          <RiDashboardFill className="icon-size" /> &nbsp;&nbsp;
          <span className="text-position">Dashboard</span>
        </div>
        <div className="wrapper-home">
          <div className="container">
            {/* Box แสดงจำนวนวันจองของวันนี้ */}
            <div className="box-green">
              <LuCalendarDays className="icon-inside-box" />
            </div>
            <div className="box-brightgreen box2">
              <div className="text-dashboard-right">
                <p>จองห้องประชุมวันนี้</p>
                <p>{approvedDaysToday}</p>
                <p>ครั้ง</p>
              </div>
            </div>
            &nbsp; &nbsp; &nbsp; &nbsp; 

            {/* Box แสดงจำนวนห้องประชุมทั้งหมด */}
            <div className="box-yellow">
              <LuClipboardList className="icon-inside-box" />
            </div>
            <div className="brightyellow">
              <div className="text-dashboard-right">
                <p>ห้องประชุม</p>
                <p>2</p>
                <p>ห้องประชุมทั้งหมด</p>
              </div>
            </div>
          </div>
        </div>

        <div>
          &nbsp;&nbsp;&nbsp;
          <FaCalendarAlt className="icon-size" /> &nbsp;&nbsp;
          <span className="text-position">ปฏิทินการจอง</span>
        </div>

        <p></p>
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

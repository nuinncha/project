import React, { useEffect, useState } from 'react';
import Navbar from "./components/navbar";
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';
import './check.css';

const API_URL = "http://localhost:3000/bookings";

function Check_Page() {
  const navigate = useNavigate();
  const [bookings, setBookings] = useState([]);
  const [userRole, setUserRole] = useState("admin");
  const [filters, setFilters] = useState({
    roomName: "",
    status: "",
    startDate: "",
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user')); // ดึงข้อมูลผู้ใช้จาก localStorage
    if (!user || user.role !== "admin") {
      // หากไม่มีผู้ใช้หรือไม่ใช่ admin
      Swal.fire({
        icon: "error",
        title: "คุณไม่มีสิทธิ์เข้าถึงหน้านี้",
        text: "กรุณาล็อกอินด้วยบัญชีผู้ดูแลระบบ",
      }).then(() => {
        navigate('/'); // นำทางกลับไปที่หน้า Login
      });
    } else {
      setUserRole(user.role); // กำหนด role ของผู้ใช้
      fetch(API_URL)
        .then((res) => res.json())
        .then((data) => setBookings(data))
        .catch((err) => console.error("Error fetching bookings:", err));
    }
  }, [navigate]);

  const showBookingDetails = (booking) => {
    Swal.fire({
      title: "รายละเอียดการจอง",
      html: `
        <p><strong>ห้อง:</strong> ${booking.roomName}</p>
        <p><strong>หัวข้อ:</strong> ${booking.topic}</p>
        <p><strong>ผู้จอง:</strong> ${booking.bookerName}</p>
        <p><strong>เบอร์โทร:</strong> ${booking.phone}</p>
        <p><strong>แผนก:</strong> ${booking.department}</p>
        <p><strong>วัตถุประสงค์:</strong> ${booking.purpose}</p>
        <p><strong>วันที่เริ่ม:</strong> ${booking.startDate}</p>
        <p><strong>เวลาเริ่ม:</strong> ${booking.startTime}</p>
        <p><strong>วันที่สิ้นสุด:</strong> ${booking.endDate}</p>
        <p><strong>เวลาสิ้นสุด:</strong> ${booking.endTime}</p>
        <p><strong>สถานะ:</strong> ${booking.status}</p>
      `,
      showCancelButton: true,
      showDenyButton: userRole === "admin",
      confirmButtonText: userRole === "admin" ? "✅ อนุมัติ" : "ปิด",
      denyButtonText: "❌ ไม่อนุมัติ",
      cancelButtonText: "❎ ยกเลิก",
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed && userRole === "admin") {
        updateBookingStatus(booking._id, "อนุมัติ");
      } else if (result.isDenied) {
        updateBookingStatus(booking._id, "ไม่อนุมัติ");
      }
    });
  };

  const updateBookingStatus = (id, status) => {
    fetch(`${API_URL}/${id}/status`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    })
      .then(res => res.json())
      .then(() => {
        setBookings(bookings.map(b => (b._id === id ? { ...b, status } : b)));
        Swal.fire({
          icon: "success",
          title: "สำเร็จ!",
          text: `สถานะการจองเปลี่ยนเป็น "${status}"`,
        });
      })
      .catch(err => {
        console.error("Error updating status:", err);
        Swal.fire({
          icon: "error",
          title: "เกิดข้อผิดพลาด",
          text: "ไม่สามารถเปลี่ยนสถานะได้",
        });
      });
  };

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  const filteredBookings = bookings.filter((b) =>
    (filters.roomName === "" || b.roomName.includes(filters.roomName)) &&
    (filters.status === "" || b.status === filters.status) &&
    (filters.startDate === "" || b.startDate.startsWith(filters.startDate))
  );

  return (
    <>
      <Navbar />
      <div className='bg-check'>
        <div className="container-check">
          <h5>รายการจองทั้งหมด</h5>
          <div className="filters">
            <input type="date" name="startDate" value={filters.startDate} onChange={handleFilterChange} />
            <select name="roomName" value={filters.roomName} onChange={handleFilterChange}>
              <option value="">ทุกห้อง</option>
              <option value="ห้องประชุม 1">ห้องประชุม 1</option>
              <option value="อาคารเฉลิมพระเกียรติ">อาคารเฉลิมพระเกียรติ</option>
            </select>
            <select name="status" value={filters.status} onChange={handleFilterChange}>
              <option value="">ทุกสถานะ</option>
              <option value="pending">รอตรวจสอบ</option>
              <option value="confirmed">อนุมัติ</option>
              <option value="cancelled">ไม่อนุมัติ</option>
            </select>
          </div>

          <div className="booking-list">
            {filteredBookings.length === 0 ? (
              <p>ไม่มีข้อมูลการจอง</p>
            ) : (
              filteredBookings.map((booking) => (
                <div className="booking-card" key={booking._id} onClick={() => userRole === "admin" && showBookingDetails(booking)}>
                  <h3>{booking.roomName}</h3>
                  <p><strong>ผู้จอง:</strong> {booking.bookerName}</p>
                  <p><strong>วันเริ่ม:</strong> {booking.startDate} | <strong>เวลา:</strong> {booking.startTime}</p>
                  <p><strong>สถานะ:</strong> {booking.status}</p>
                  {userRole === "admin" && <button onClick={(e) => { e.stopPropagation(); showBookingDetails(booking); }}>รายละเอียด</button>}
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Check_Page;

import React, { useState } from "react";
import "./calendar.css"; // ไฟล์ CSS สำหรับ Calendar

function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  
  const handlePrevMonth = () => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(prevDate.getMonth() - 1); // เปลี่ยนไปเดือนก่อนหน้า
      return newDate;
    });
  };
  
  const handleNextMonth = () => {
    setCurrentDate((prevDate) => {
      const newDate = new Date(prevDate);
      newDate.setMonth(prevDate.getMonth() + 1); // เปลี่ยนไปเดือนถัดไป
      return newDate;
    });
  };
  
  const monthNames = [
    "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
    "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
  ];

  const renderCalendarDays = () => {
    const firstDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
    const lastDayOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);
    const totalDays = lastDayOfMonth.getDate();

    // หาวันแรกของเดือน
    const startDay = firstDayOfMonth.getDay();
    
    // สร้าง array ของวันว่างที่ต้องการแสดงก่อนเริ่มต้นเดือน
    const days = Array.from({ length: startDay }).map((_, index) => <div key={`empty-${index}`} className="empty-day"></div>); 

    // เพิ่มวันในเดือนจริงๆ
    for (let i = 1; i <= totalDays; i++) {
      days.push(
        <div key={i} className="day">
          {i}
        </div>
      );
    }

    return days;
  };

  return (
    <div className="calendar">
      {/* Header ปฏิทิน */}
      <div className="calendar-header">
        <button onClick={handlePrevMonth}>&lt;</button>
        <h3>{`${monthNames[currentDate.getMonth()]} ${currentDate.getFullYear() + 543}`}</h3> {/* แสดงเดือนและปีในรูปแบบไทย */}
        <button onClick={handleNextMonth}>&gt;</button>
      </div>

      {/* Grid ปฏิทิน */}
      <div className="calendar-grid">
        {/* วันในสัปดาห์ */}
        {["อา", "จ", "อ", "พ", "พฤ", "ศ", "ส"].map((day) => (
          <div key={day} className="day-name">
            {day}
          </div>
        ))}

        {/* วันทั้งหมด */}
        {renderCalendarDays()}
      </div>
    </div>
  );
}

export default Calendar;

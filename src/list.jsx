import React, { useState, useEffect, forwardRef } from "react";
import Navbar from "./components/navbar";
import './list.css';
import { FiSave } from "react-icons/fi";
import { RiFileEditFill, RiUser3Fill, RiTodoFill } from "react-icons/ri";
import { FaPhoneAlt, FaPen, FaCalendarAlt } from "react-icons/fa"; // เช็คให้ถูกต้อง
import { FaClock } from "react-icons/fa6";
import { TbNumber123 } from "react-icons/tb";
import { PiGitBranchBold } from "react-icons/pi";
import { useNavigate } from 'react-router-dom';

import DatePicker, { registerLocale } from 'react-datepicker';
import th from 'date-fns/locale/th';
import { format } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';

registerLocale('th', th);

// ฟังก์ชันช่วยแสดงวันที่แบบ พ.ศ.
const formatBuddhistDate = (date) => {
  if (!date || isNaN(new Date(date))) return '';
  const gregorianDate = new Date(date);
  const buddhistYear = gregorianDate.getFullYear() + 543;
  const monthDay = format(gregorianDate, 'dd MMMM', { locale: th });
  return `${monthDay} ${buddhistYear}`;
};

// customInput สำหรับ react-datepicker
const CustomDateInput = forwardRef(({ value, onClick }, ref) => (
  <input
    className="long-time-input"
    onClick={onClick}
    ref={ref}
    value={value}
    readOnly
  />
));

function List_Page() {
  const navigate = useNavigate();
  const udata = JSON.parse(localStorage.getItem("user"));

  // สถานะต่างๆ ของวันที่และเวลา
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');

  const [formData, setFormData] = useState({
    roomName: localStorage.getItem("room"),
    email: udata?.email || "",
    participants: "",
    topic: "",
    bookerName: udata?.name || "",
    phone: udata?.phone || "",
    department: "",
    purpose: "",
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    equipment: [],
    otherDetails: "",
  });

  // ดึงข้อมูลโปรไฟล์ผู้ใช้งาน (หากใช้)
  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) return;

      try {
        const res = await fetch("http://localhost:3000/profile", {
          headers: { "Authorization": `Bearer ${token}` }
        });
        if (!res.ok) throw new Error("ไม่สามารถดึงข้อมูลโปรไฟล์ได้");
        const data = await res.json();
        setFormData(prev => ({
          ...prev,
          bookerName: data.name,
          phone: data.phone,
          email: data.email
        }));
      } catch (err) {
        console.error(err);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (name === 'startTime') setStartTime(value);
    if (name === 'endTime') setEndTime(value);
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      equipment: checked
        ? [...prev.equipment, value]
        : prev.equipment.filter(item => item !== value)
    }));
  };

const handleSubmit = async (e) => {
  e.preventDefault();

  const start = new Date(startDate);
  const end = new Date(endDate ?? startDate);

  const [startHour, startMin] = startTime.split(':').map(Number);
  const [endHour, endMin] = endTime.split(':').map(Number);

  start.setHours(startHour, startMin, 0, 0);
  end.setHours(endHour, endMin, 0, 0);

  // เงื่อนไข: ถ้าวันเดียวกัน และเวลาสิ้นสุดต้องมากกว่าเวลาเริ่มต้น 1 ชม.
  if (start.toDateString() === end.toDateString()) {
    const diffMs = end - start;
    const diffHours = diffMs / (1000 * 60 * 60);
    if (diffHours < 1) {
      alert("เวลาสิ้นสุดต้องมากกว่าเวลาเริ่มต้นอย่างน้อย 1 ชั่วโมง");
      return;
    }
  }

  try {
    const res = await fetch("http://localhost:3000/book-room", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      alert("จองห้องสำเร็จ!");
      navigate('/');
    } else {
      alert("กรุณาเข้าสู่ระบบก่อน!");
    }
  } catch (err) {
    alert("เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์");
    console.error(err);
  }
};

  return (
    <>
      <Navbar />
      <div className=" bg-list wrapper-list">
        <div className="container-list">
          <form onSubmit={handleSubmit}>

            {/* หัว form */}
            <div style={{ marginTop: "15px" }}>
              <RiFileEditFill className="icon-size" />{" "}
              <span className="text-position">เพิ่ม การจอง</span>
              <h5 style={{ marginTop: "15px" }}>รายละเอียดการจอง</h5>
            </div>

            {/* ชื่อห้อง / จำนวน */}
            <div className="row">
              <div className="left">
                <label>ชื่อห้อง</label>
                <div className="input-group">
                  <div className="empty-box icon-inside-empty2"><RiTodoFill /></div>
                  <input className="long-time-input" type="text" value={formData.roomName} readOnly />
                </div>
              </div>
              <div className="right">
                <label>จำนวนผู้เข้าประชุม</label>
                <div className="input-group">
                  <div className="empty-box icon-inside-empty"><TbNumber123 /></div>
                  <input className="long-time-input" name="participants" type="number" min="1" placeholder="1" onChange={handleChange} />
                </div>
              </div>
            </div>

            {/* หัวข้อ */}
            <div className="row">
              <div className="left">
                <label>หัวข้อ</label>
                <div className="input-group">
                  <div className="empty-box"><FaPen /></div>
                  <input name="topic" className="long-input" type="text" onChange={handleChange} />
                </div>
              </div>
            </div>

            {/* ชื่อ-โทรศัพท์ผู้จอง */}
            <div className="row">
              <div className="left">
                <label>ชื่อผู้จอง</label>
                <div className="input-group">
                  <div className="empty-box"><RiUser3Fill /></div>
                  <input className="long-time-input" name="bookerName" value={formData.bookerName} onChange={handleChange} />
                </div>
              </div>
              <div className="right">
                <label>โทรศัพท์</label>
                <div className="input-group">
                  <div className="empty-box"><FaPhoneAlt /></div>
                  <input className="long-time-input" name="phone" value={formData.phone} onChange={handleChange} />
                </div>
              </div>
            </div>

            {/* ใช้สำหรับ / แผนก */}
            <div className="row">
              <div className="left">
                <label>ใช้สำหรับ</label>
                <div className="input-group">
                  <div className="empty-box icon-inside-empty2"><PiGitBranchBold /></div>
                  <select className="select-list" name="purpose" onChange={handleChange}>
                    <option value="">-- โปรดเลือก --</option>
                    <option value="ประชุมเจ้าหน้าที่">ประชุมเจ้าหน้าที่</option>
                    <option value="ประชุมสภาเทศบาล">ประชุมสภาเทศบาล</option>
                    <option value="ประชุมหัวหน้าส่วนราชการ">ประชุมหัวหน้าส่วนราชการ</option>
                    <option value="ประชาคมหมู่บ้าน">ประชาคมหมู่บ้าน</option>
                    <option value="ฝึกอบรมบุคลากร">ฝึกอบรมบุคลากร</option>
                    <option value="อบรมอาสาสมัคร">อบรมอาสาสมัคร</option>
                    <option value="แถลงข่าวของเทศบาล">แถลงข่าวของเทศบาล</option>
                    <option value="จัดประชุมคณะกรรมการการเลือกตั้งท้องถิ่น">จัดประชุม...</option>
                    <option value="จัดหน่วยเลือกตั้ง">จัดหน่วยเลือกตั้ง</option>
                    <option value="อื่นๆ">อื่นๆ</option>
                  </select>
                </div>
              </div>
              <div className="left">
                <label>แผนกที่ขอใช้</label>
                <div className="input-group">
                  <div className="empty-box icon-inside-empty2"><PiGitBranchBold /></div>
                  <select className="select-list" name="department" onChange={handleChange}>
                    <option value="">-- โปรดเลือก --</option>
                    <option value="สำนักปลัด">สำนักปลัด</option>
                    <option value="กองช่าง">กองช่าง</option>
                    <option value="กองสาธารณสุข">กองสาธารณสุข</option>
                    <option value="กองการศึกษา">กองการศึกษา</option>
                    <option value="กองคลัง">กองคลัง</option>
                  </select>
                </div>
              </div>
            </div>

            {/* วันที่เริ่มต้น/เวลาม */}
            <div className="row">
              <label>วันที่เริ่มต้น/เวลาเริ่มต้น</label>
              <div className="datetime row">
                <div className="left">
                  <div className="input-group">
                    <div className="empty-box"><FaCalendarAlt /></div>
                    <DatePicker
                      selected={startDate}
                      onChange={(date) => {
                        setStartDate(date);
                        setFormData(prev => ({ ...prev, startDate: date.toISOString().split('T')[0] }));
                      }}
                      locale="th"
                      dateFormat="dd MMMM yyyy"
                      customInput={<CustomDateInput value={formatBuddhistDate(startDate)} />}
                    />
                  </div>
                </div>
                <div className="right">
                  <div className="input-group">
                    <div className="empty-box"><FaClock /></div>
                    <input type="time" name="startTime" onChange={handleChange} className="long-time-input" />
                  </div>
                </div>
              </div>
            </div>

            {/* วันที่สิ้นสุด/เวลา */}
            <div className="row">
              <label>วันที่สิ้นสุด/เวลาสิ้นสุด</label>
              <div className="datetime row">
                <div className="left">
                  <div className="input-group">
                    <div className="empty-box"><FaCalendarAlt /></div>
                    <DatePicker
                      selected={endDate}
                      onChange={(date) => {
                        setEndDate(date);
                        setFormData(prev => ({ ...prev, endDate: date.toISOString().split('T')[0] }));
                      }}
                      locale="th"
                      dateFormat="dd MMMM yyyy"
                      customInput={<CustomDateInput value={formatBuddhistDate(endDate)} />}
                    />
                  </div>
                </div>
                <div className="right">
                  <div className="input-group">
                    <div className="empty-box"><FaClock /></div>
                    <input type="time" name="endTime" onChange={handleChange} className="long-time-input" />
                  </div>
                </div>
              </div>
            </div>

            {/* อุปกรณ์ */}
            <div className="row">
              <label>อุปกรณ์</label>
              <div className="equipment-wrapper">
                <div className="empty-box-5 icon-inside-empty2"><PiGitBranchBold /></div>
                <div className="equipment-boxx2 box-margin">
                  <label><input type="checkbox" value="เครื่องคอมพิวเตอร์" onChange={handleCheckboxChange} /> เครื่องคอมพิวเตอร์</label>
                  <label><input type="checkbox" value="โปรเจ็กเตอร์" onChange={handleCheckboxChange} /> โปรเจ็กเตอร์</label>
                  <label><input type="checkbox" value="ไมค์โครโฟน" onChange={handleCheckboxChange} /> ไมค์โครโฟน</label>
                  <label><input type="checkbox" value="ของว่าง" onChange={handleCheckboxChange} /> ของว่าง</label>
                  <label><input type="checkbox" value="อาหารเที่ยง" onChange={handleCheckboxChange} /> อาหารเที่ยง</label>
                </div>
              </div>
            </div>

            {/* อื่นๆ */}
            <div className="row">
              <div className="left">
                <label>อื่นๆ</label>
                <textarea name="otherDetails" onChange={handleChange} className="details-textarea" placeholder="รายละเอียดเพิ่มเติม"></textarea>
              </div>
            </div>

            {/* ปุ่มบันทึก */}
            <div>
              <button type="submit" className="save-btn">
                <FiSave className="icon-inside-btn" /> บันทึก
              </button>
            </div>

          </form>
        </div>
      </div>
    </>
  );
}

export default List_Page;

import React, { useState, useEffect, forwardRef } from "react";
import Navbar from "./components/navbar";
import './list.css'
import { FiSave } from "react-icons/fi";
import { RiFileEditFill } from "react-icons/ri";
import { RiUser3Fill } from "react-icons/ri";
import { FaPhoneAlt } from "react-icons/fa";
import { TbNumber123 } from "react-icons/tb";
import { RiTodoFill } from "react-icons/ri";
import { FaPen } from "react-icons/fa6";
import { PiGitBranchBold } from "react-icons/pi";
import { FaClock } from "react-icons/fa6";
import { FaCalendarAlt } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';

import DatePicker, { registerLocale } from 'react-datepicker';
import th from 'date-fns/locale/th';
import { format } from 'date-fns';
import 'react-datepicker/dist/react-datepicker.css';

registerLocale('th', th);

const formatBuddhistDate = (date) => {
  if (!date || isNaN(new Date(date))) return '';
  const gregorianDate = new Date(date);
  return format(gregorianDate, 'dd MMMM yyyy', { locale: th }).replace(
    /([0-9]{4})$/,
    (year) => (parseInt(year) + 543).toString()
  );
};

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
  const [startDate, setStartDate] = useState(new Date());
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState({});

  const navigate = useNavigate();
  const udata = JSON.parse(localStorage.getItem("user"));

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

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("กรุณาเข้าสู่ระบบ");
        setLoading(false);
        return;
      }

      try {
        const response = await fetch("http://localhost:3000/profile", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) throw new Error("ไม่สามารถดึงข้อมูลโปรไฟล์ได้");

        const data = await response.json();
        setUser(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      equipment: checked ? [...prev.equipment, value] : prev.equipment.filter((item) => item !== value),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/book-room", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert("จองห้องสำเร็จ!");
        navigate('/')
      } else {
        alert("กรุณาเข้าสู่ระบบก่อน!");
      }
    } catch (error) {
      alert("เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์");
    }
  };

  return (
    <>
      <Navbar />
      <div className='wrapper-list'>
        <div className='container-list'>
          <form onSubmit={handleSubmit}>
            <div style={{ marginTop: "15px" }}>
              <RiFileEditFill className='icon-size' />&nbsp;&nbsp;
              <span className="text-position">เพิ่ม การจอง</span>
              <h5 style={{ marginTop: "15px" }}>รายละเอียดการจอง</h5>
            </div>

            <div className="row">
              <div className="left">
                <label>ชื่อห้อง</label>
                <div className="input-group">
                  <div className="empty-box icon-inside-empty2"><RiTodoFill /></div>
                  <input className='long-time-input' type="text" value={formData.roomName} readOnly />
                </div>
              </div>
              <div className="right">
                <label>จำนวนผู้เข้าประชุม</label>
                <div className="input-group">
                  <div className="empty-box icon-inside-empty"><TbNumber123 /></div>
                  <input className='long-time-input' name="participants" type="number" min="1" onChange={handleChange} />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="left">
                <label>หัวข้อ</label>
                <div className="input-group">
                  <div className="empty-box"><FaPen /></div>
                  <input name="topic" className='long-input' type="text" onChange={handleChange} />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="left">
                <label>ชื่อผู้จอง</label>
                <div className="input-group">
                  <div className="empty-box"><RiUser3Fill /></div>
                  <input className='long-time-input' name="bookerName" onChange={handleChange} type="text" value={formData.bookerName} />
                </div>
              </div>
              <div className="right">
                <label>โทรศัพท์</label>
                <div className="input-group">
                  <div className="empty-box"><FaPhoneAlt /></div>
                  <input className='long-time-input' name="phone" type="text" value={formData.phone} />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="left">
                <label>ใช้สำหรับ</label>
                <div className="input-group">
                  <div className="empty-box icon-inside-empty2"><PiGitBranchBold /></div>
                  <select className='select-list' name="purpose" onChange={handleChange}>
                    <option value="">-- โปรดเลือก --</option>
                    <option value="ประชุมเจ้าหน้าที่">ประชุมเจ้าหน้าที่</option>
                    <option value="ประชุมสภาเทศบาล">ประชุมสภาเทศบาล</option>
                    <option value="ประชุมหัวหน้าส่วนราชการ">ประชุมหัวหน้าส่วนราชการ</option>
                    <option value="ประชาคมหมู่บ้าน">ประชาคมหมู่บ้าน</option>
                    <option value="ฝึกอบรมบุคลากร">ฝึกอบรมบุคลากร</option>
                    <option value="อบรมอาสาสมัคร">อบรมอาสาสมัคร</option>
                    <option value="แถลงข่าวของเทศบาล">แถลงข่าวของเทศบาล</option>
                    <option value="จัดประชุมคณะกรรมการการเลือกตั้งท้องถิ่น">จัดประชุมคณะกรรมการการเลือกตั้งท้องถิ่น</option>
                    <option value="จัดหน่วยเลือกตั้ง">จัดหน่วยเลือกตั้ง</option>
                    <option value="อื่นๆ">อื่นๆ</option>
                  </select>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="left">
                <label>แผนกที่ขอใช้</label>
                <div className="input-group">
                  <div className="empty-box icon-inside-empty2"><PiGitBranchBold /></div>
                  <select className='select-list' name="department" onChange={handleChange}>
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
                        const isoDate = new Date(date.getFullYear(), date.getMonth(), date.getDate()).toISOString().split('T')[0];
                        setFormData({ ...formData, startDate: isoDate });
                      }}
                      locale="th"
                      dateFormat="dd MMMM yyyy"
                      className="long-time-input"
                      customInput={<CustomDateInput value={formatBuddhistDate(startDate)} />}
                    />
                  </div>
                </div>
                <div className='right'>
                  <div className="input-group">
                    <div className="empty-box"><FaClock /></div>
                    <input type="time" name="startTime" onChange={handleChange} className="long-time-input" />
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <label>วันที่สิ้นสุด/เวลาสิ้นสุด</label>
              <div className="datetime row">
                <div className="left">
                  <div className="input-group">
                    <div className="empty-box"><FaCalendarAlt /></div>
                    <DatePicker
                      selected={formData.endDate ? new Date(formData.endDate) : null}
                      onChange={(date) => {
                        const isoDate = new Date(date.getFullYear(), date.getMonth(), date.getDate()).toISOString().split('T')[0];
                        setFormData({ ...formData, endDate: isoDate });
                      }}
                      locale="th"
                      dateFormat="dd MMMM yyyy"
                      className="long-time-input"
                      customInput={<CustomDateInput value={formatBuddhistDate(formData.endDate)} />}
                    />
                  </div>
                </div>
                <div className='right'>
                  <div className="input-group">
                    <div className="empty-box"><FaClock /></div>
                    <input type="time" name="endTime" onChange={handleChange} className="long-time-input" />
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <label>อุปกรณ์</label>
              <div className="equipment-wrapper">
                <div className="empty-box-5 icon-inside-empty2"><PiGitBranchBold /></div>
                <div className='equipment-boxx2 box-margin'>
                  <div>
                    <label><input type="checkbox" value="เครื่องคอมพิวเตอร์" onChange={handleCheckboxChange} /> เครื่องคอมพิวเตอร์</label>
                    <label><input type="checkbox" value="โปรเจ็กเตอร์" onChange={handleCheckboxChange} /> โปรเจ็กเตอร์</label>
                    <label><input type="checkbox" value="ไมค์โครโฟน" onChange={handleCheckboxChange} /> ไมค์โครโฟน</label>
                    <label><input type="checkbox" value="ของว่าง" onChange={handleCheckboxChange} /> ของว่าง</label>
                    <label><input type="checkbox" value="อาหารเที่ยง" onChange={handleCheckboxChange} /> อาหารเที่ยง</label>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="left">
                <label>อื่นๆ</label>
                <textarea className='details-textarea' name="otherDetails" onChange={handleChange} placeholder="รายละเอียดเพิ่มเติม"></textarea>
              </div>
            </div>

            <div>
              <button type="submit" className="save-btn">
                <FiSave className="icon-inside-btn" />
                บันทึก
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default List_Page;

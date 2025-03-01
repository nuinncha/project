import React, { useState,useEffect } from "react";
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


function List_Page() {

  const navigate = useNavigate();
  // const [user, setUser] = useState(null);

  //   useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   const udata = localStorage.getItem('user')
  //   setUser(JSON.parse(udata));

  // }, []);


  const [formData, setFormData] = useState({
    roomName: localStorage.getItem("room"),
    email: JSON.parse(localStorage.getItem("user"))?.email || "", // ดึง email จาก localStorage
    participants: "",
    topic: "",
    bookerName: "",
    phone: "",
    department: "",
    purpose: "",
    startDate: "",
    startTime: "",
    endDate: "",
    endTime: "",
    equipment: [],
    otherDetails: "",
  });

  // ฟังก์ชันจัดการเปลี่ยนค่าฟอร์ม
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  // ฟังก์ชันสำหรับจัดการ checkbox
  const handleCheckboxChange = (e) => {
    const { value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      equipment: checked
        ? [...prev.equipment, value] // ถ้า checked ให้เพิ่มเข้าไป
        : prev.equipment.filter((item) => item !== value), // ถ้า unchecked ให้ลบออก
    }));
  };

  

  // ฟังก์ชันส่งข้อมูลไปยัง API
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("📤 Sending data:", formData); // Debugging

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
        alert("เกิดข้อผิดพลาดในการจองห้อง!");
      }
    } catch (error) {
      console.error("❌ Error:", error);
      alert("เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์");
    }
  };


  return (
    <>
      <div>
        <Navbar />
        <div className='wrapper-list'>
          <div className='container-list'>

            <form onSubmit={handleSubmit}>
              <div style={{ marginTop: "15px" }}>
                <RiFileEditFill className='icon-size' />&nbsp;&nbsp;
                <span className="text-position">เพิ่ม การจอง</span>
                <h5 style={{ marginTop: "15px" }}>รายละเอียดการจอง</h5>
              </div>
              {/* ชื่อห้องและจำนวนผู้เข้าร่วม */}
              <div className="row">
                <div className="left">
                  <label>ชื่อห้อง</label>
                  <div className="input-group">
                    <div className="empty-box icon-inside-empty2">
                      <RiTodoFill />
                    </div> 
                    <input className='long-time-input' type="text" value={localStorage.getItem("room")}/>
                  </div>
                </div>

                <div className="right">
                  <label>จำนวนผู้เข้าประชุม</label>
                  <div className="input-group">
                    <div className="empty-box icon-inside-empty"> <TbNumber123 /> </div> {/* กล่องเปล่า */}
                    <input className='long-time-input' name="participants" type="number" placeholder="1" onChange={handleChange} />
                  </div>
                </div>
              </div>

              {/* หัวข้อ */}
              <div className="row">
                <div className="left">
                  <label>หัวข้อ</label>
                  <div className="input-group">
                    <div className="empty-box">
                      <FaPen />
                    </div> {/* กล่องเปล่า */}
                    <input name="topic" className='long-input' type="text" placeholder="" onChange={handleChange} />
                  </div>
                </div>
              </div>

              {/* ชื่อผู้จองและโทรศัพท์ */}
              <div className="row">
                <div className="left">
                  <label>ชื่อผู้จอง</label>
                  <div className="input-group">
                    <div className="empty-box ">
                      <RiUser3Fill />
                    </div> {/* กล่องเปล่า */}
                    <input className='long-time-input' name="bookerName" onChange={handleChange} type="text" placeholder="" />
                  </div>
                </div>

                <div className="right">
                  <label>โทรศัพท์</label>
                  <div className="input-group">
                    <div className="empty-box">
                      <FaPhoneAlt />
                    </div> {/* กล่องเปล่า */}
                    <input className='long-time-input' name="phone" onChange={handleChange} type="text" placeholder="" />
                  </div>
                </div>
              </div>

              {/* ใช้สำหรับ */}
              <div className="row">
                <div className="left">
                  <label>ใช้สำหรับ</label>
                  <div className="input-group">
                    <div className="empty-box icon-inside-empty2"><PiGitBranchBold /></div>
                    <select className='select-list' name="purpose" onChange={handleChange}>
                      <option value="">-- โปรดเลือก --</option>
                      <option value=" ประชุมเจ้าหน้าที่"> ประชุมเจ้าหน้าที่</option>
                      <option value="ประชุมสภาเทศบาล">ประชุมสภาเทศบาล</option>
                      <option value="ประชุมหัวหน้าส่วนราชการ">ประชุมหัวหน้าส่วนราชการ</option>
                      <option value="ประชาคมหมู่บ้าน ">ประชาคมหมู่บ้าน </option>
                      <option value="ฝึกอบรมบุคลากร">ฝึกอบรมบุคลากร</option>
                      <option value="อบรมอาสาสมัคร ">อบรมอาสาสมัคร </option>
                      <option value="แถลงข่าวของเทศบาล">แถลงข่าวของเทศบาล</option>
                      <option value="จัดประชุมคณะกรรมการการเลือกตั้งท้องถิ่น">จัดประชุมคณะกรรมการการเลือกตั้งท้องถิ่น</option>
                      <option value="จัดหน่วยเลือกตั้ง">จัดหน่วยเลือกตั้ง</option>
                    </select>
                  </div>
                </div>
              </div>


              {/* แผนกที่ขอใช้ */}
              <div className="row">
                <div className="left">
                  <label>แผนกที่ขอใช้</label>
                  <div className="input-group">
                    <div className="empty-box icon-inside-empty2"><PiGitBranchBold /></div>
                    <select className='select-list' name="department" onChange={handleChange}>
                      <option value="">-- โปรดเลือก -- </option>
                      <option value="สำนักปลัด">สำนักปลัด</option>
                      <option value="กองช่าง">กองช่าง</option>
                      <option value="กองสาธารณสุข">กองสาธารณสุข</option>
                      <option value="กองการศึกษา">กองการศึกษา</option>
                      <option value="กองคลัง">กองคลัง</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* วันที่และเวลา */}
              <div className="row">
                <label>วันที่เริ่มต้น/เวลาเริ่มต้น</label>
                <div className="datetime">
                  <div className='row'>
                    <div className="left">
                      <div className="input-group">
                        <div className="empty-box"><FaCalendarAlt /></div>
                        <input type="date" name="startDate" onChange={handleChange} className="long-time-input" />
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
              </div>
              {/* วันที่และเวลา */}
              <div className="row">
                <label>วันที่สิ้นสุด/เวลาสิ้นสุด</label>
                <div className="datetime">
                  <div className='row'>
                    <div className="left">
                      <div className="input-group">
                        <div className="empty-box"><FaCalendarAlt /></div>
                        <input type="date" name="endDate" onChange={handleChange} className="long-time-input" />
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
              </div>



              {/* อุปกรณ์ */}
              <div className="row">
                <div className="">
                  <label>อุปกรณ์</label>
                  <div className="equipment-wrapper">
                    <div className="empty-box icon-inside-empty2"><PiGitBranchBold /></div>
                    <div className='equipment-boxx2 box-margin'>
                      <div className="checkbox-group">
                        <label><input type="checkbox" value="เครื่องคอมพิวเตอร์" onChange={handleCheckboxChange} /> เครื่องคอมพิวเตอร์</label>
                        <label><input type="checkbox" value="โปรเจ็กเตอร์" onChange={handleCheckboxChange} /> โปรเจ็กเตอร์</label>
                        <label><input type="checkbox" value="ของว่าง" onChange={handleCheckboxChange} /> ของว่าง</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>


              {/* อื่นๆ */}
              <div className="row">
                <div className="left">
                  <label>อื่นๆ</label>
                  <textarea className='details-textarea' name="otherDetails" onChange={handleChange} placeholder="รายละเอียดเพิ่มเติม"></textarea>
                </div>
              </div>

              {/* ปุ่มบันทึก */}
              <div>
                <button type="submit" className="save-btn">
                  <FiSave className="icon-inside-btn" />
                  บันทึก
                </button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </>
  )

}

export default List_Page 
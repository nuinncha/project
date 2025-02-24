import React from 'react'
import Navbar from "./components/navbar";
import './check.css';



function Check_Page() {

  return (
    <>
      <Navbar />
      <div className="container-check">
        <h5>รายการจองทั้งหมด</h5>
        <div >
          <div class>แสดง</div>
        </div>

        <div className="form-group ">
          <select className="select-check-room" name="q" id="">
            <option value="1">1 รายการ</option>
            <option value="2">2 รายการ</option>
          </select>
        </div>

        <div className="datetime">
          <label>วันที่</label>
          <input className="select-check" type="date" name="" />
        </div>

        <div>
          <label>ห้องประชุม</label> &nbsp; &nbsp;
          <select className="select-check-room" name="q" id="">
            <option value="0">รายการทั้งหมด</option>
            <option value="1">ห้องประชุม 1</option>
            <option value="2">อาคารเฉลิมพระเกียรติ</option>
          </select>
        </div>

        <div>
          <label>ใช้สำหรับ</label> &nbsp; &nbsp;
          <select className="select-check-for" name="q" id="">
            <option value="ทั้งหมด"> ทั้งหมด </option>
            <option value=" ประชุมเจ้าหน้าที่"> ประชุมเจ้าหน้าที่ </option>
            <option value="ประชุมสภาเทศบาล"> ประชุมสภาเทศบาล </option>
            <option value="ประชุมหัวหน้าส่วนราชการ"> ประชุมหัวหน้าส่วนราชการ </option>
            <option value="ประชาคมหมู่บ้าน "> ประชาคมหมู่บ้าน </option>
            <option value="ฝึกอบรมบุคลากร"> ฝึกอบรมบุคลากร </option>
            <option value="อบรมอาสาสมัคร "> อบรมอาสาสมัคร </option>
            <option value="แถลงข่าวของเทศบาล"> แถลงข่าวของเทศบาล </option>
            <option value="จัดประชุมคณะกรรมการการเลือกตั้งท้องถิ่น"> จัดประชุมคณะกรรมการการเลือกตั้งท้องถิ่น </option>
            <option value="จัดหน่วยเลือกตั้ง"> จัดหน่วยเลือกตั้ง </option>
          </select>
        </div>
        <div>
          <label>สถานะ</label> &nbsp; &nbsp;
          <select className="select-check-room" name="q" id="">
            <option value="รอตรวจสอบ">รอตรวจสอบ</option>
            <option value="1">ห้องประชุม 1</option>
            <option value="2">อาคารเฉลิมพระเกียรติ</option>
          </select>
        </div>

      </div>
    </>
  );
}
export default Check_Page

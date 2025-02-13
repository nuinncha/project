import React from 'react'
import Navbar from "./components/navbar";
import './check.css';



function Check_Page() {
  return (
    <>
      <Navbar />
      <div>
        <h5>จองห้องประชุม รอตรวจสอบ</h5>
      </div>
      <div style={{ display: "flex", alignItems: "center" }}>
        <label>แสดง</label>
        <div className='dropdown-container'>
          <select name="q" id="">
            <option value="1">1 รายการ</option>
            <option value="2">2 รายการ</option>
          </select>
          <label>วันที่</label>
          <input className='input-calendar' type="" value="" />
          <label>ห้องประชุม</label> &nbsp; &nbsp;
          <select name="q" id="">
            <option value="0">รายการทั้งหมด</option>
            <option value="1">1 รายการ</option>
            <option value="2">2 รายการ</option>
          </select>
          <label>ใช้สำหรับ</label> &nbsp; &nbsp;
          <select name="q" id="">
            <option value="0">ทั้งหมด</option>
            <option value="1">1 รายการ</option>
            <option value="2">2 รายการ</option>
          </select>
        </div>
      </div>

      <div className='top'>
        <label>แผนกที่ขอใช้</label> &nbsp;
        <select name="q" id="">
          <option value="0">ทั้งหมด</option>
          <option value="hr">สำนักปลัด</option>
          <option value="it">กองช่าง</option>
          <option value="marketing">กองสาธารณสุข</option>
          <option value="finance">กองการศึกษา</option>
          <option value="operations">กองคลัง</option>
        </select>
        <label>สถานะ</label> &nbsp;
        <select name="q" id="">
          <option value="0">รอตรวจสอบ</option>
          <option value="1">อนุมัติ</option>
        </select>
        <button className="btn-go">Go</button>
        <section className='teams'>
          <div className='teams-items'>
            <p>หัวข้อ</p>
          </div>
          <div className='teams-items'>
            <p>ชื่อห้อง</p>
          </div>
          <div className='teams-items'>
            <p>ชื่อผู้จอง</p>
          </div>
          <div className='teams-items'>
            <p>สร้างเมื่อ</p>
          </div>
          <div className='teams-items'>
            <p>สถานะ</p>
          </div>
        </section>
        <tr>
          <td>
            <button className='button-purple'>รอตรวจสอบ</button>&nbsp; &nbsp;
          </td>
        </tr>
        <tr>
          <td>
            <button className='button-purple'>รอตรวจสอบ</button>&nbsp; &nbsp;
          </td>
        </tr>
        <div>
        </div>
      </div>

    </>
  )
}

export default Check_Page

import React from 'react'
import Navbar from "./components/navbar";
import './list.css'
import { FiSave } from "react-icons/fi";



function List_Page() {
  return (
    <>
      <Navbar />
      <div>
        <div className='container-list'>
          <div>
            <h3>เพิ่ม การจอง</h3>
            <h5>รายละเอียดการจอง</h5>
          </div>
          {/* ชื่อห้องและจำนวนผู้เข้าร่วม */}
          <div className="row">
            <div className="left">
              <label>ชื่อห้อง</label>
              <input type="text" placeholder="ชื่อห้อง" />
            </div>
            <div className="right">
              <label>จำนวนผู้เข้าร่วมประชุม</label>
              <input type="number" placeholder="123" />
            </div>
          </div>

          {/* หัวข้อ */}
          <div className="row">
            <div className="left">
              <label>หัวข้อ</label>
              <input type="text" placeholder="หัวข้อ" />
            </div>
          </div>

          {/* ชื่อผู้จองและโทรศัพท์ */}
          <div className="row">
            <div className="left">
              <label>ชื่อผู้จอง</label>
              <input type="text" placeholder="ชื่อผู้จอง" />
            </div>
            <div className="right">
              <label>โทรศัพท์</label>
              <input type="text" placeholder="เบอร์โทรศัพท์" />
            </div>
          </div>

          {/* ใช้สำหรับ */}
          <div className="row">
            <div className="left">
              <label>ใช้สำหรับ</label>
              <input type="text" placeholder="วัตถุประสงค์" />
            </div>
          </div>


          {/* แผนกที่ขอใช้ */}
          <div className="row">
            <div className="left">
              <label>แผนกที่ขอใช้</label>
              <select>
                <option value=""> -- กรุณาเลือกแผนก -- </option>
                <option value="hr">สำนักปลัด</option>
                <option value="it">กองช่าง</option>
                <option value="marketing">กองสาธารณสุข</option>
                <option value="finance">กองการศึกษา</option>
                <option value="operations">กองคลัง</option>
              </select>
            </div>
          </div>

          {/* วันที่และเวลา */}
          <div className="row">
            <label>วันที่เริ่มต้น/เวลาเริ่มต้น</label>
            <div className="datetime">
              <div className='row'>
                <div className="left">
                  <input type="date" />
                </div>
                <div className='right'>
                  <input type="time" />
                </div>
              </div>
            </div>
          </div>

          <div className="right">
            <label>วันที่สิ้นสุด/เวลาสิ้นสุด</label>
            <div className="datetime">
              <div className='row'>
                <div className='left'>
                  <input type="date" />
                </div>
                <div className='right'>
                  <input type="time" />
                </div>
              </div>
            </div>
          </div>

          {/* อุปกรณ์ */}
          <div className="row">
            <div className="left">
              <label>อุปกรณ์</label>
              <div className='equipment-box'>
                <div className="checkbox-group">
                  <label><input type="checkbox" /> เครื่องคอมพิวเตอร์</label>
                  <label><input type="checkbox" /> โปรเจ็กเตอร์</label>
                  <label><input type="checkbox" /> เครื่องฉายแผ่นใส</label>
                  <label><input type="checkbox" /> ของว่าง</label>
                </div>
              </div>
            </div>
          </div>


          {/* อื่นๆ */}
          <div className="row">
            <div className="left">
              <label>อื่นๆ</label>
              <textarea className='details-textarea' placeholder="รายละเอียดเพิ่มเติม"></textarea>
            </div>
          </div>

          {/* ปุ่มบันทึก */}
          <div>
            <button type="submit" className="save-btn">
              <FiSave className="icon-inside-btn" /> 
              บันทึก 
            </button>
          </div>      
          </div>
      </div>
    </>
  )

}

export default List_Page 